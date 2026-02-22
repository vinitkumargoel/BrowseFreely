import { Hono } from 'hono'
import { isValidUrl, isPrivateIP, ensureUrl } from '../utils/url'
import { isAd } from '../utils/adblocker'
import { getSettings } from '../utils/settings'
import { getSessionId, getCookiesForDomain, saveCookiesFromResponse } from '../utils/session'
import { assetCache } from '../utils/cache'

export const assetRoute = new Hono()

assetRoute.get('/asset', async (c) => {
  const urlParam = c.req.query('url')
  const referer = c.req.header('referer') || 'https://browsefreely.test'
  
  if (!urlParam) {
    return c.text('URL is required', 400)
  }

  const targetUrl = ensureUrl(urlParam)

  if (!isValidUrl(targetUrl)) {
    return c.text('Invalid URL', 400)
  }

  if (isPrivateIP(targetUrl)) {
    return c.text('Forbidden URL', 403)
  }

  if (isAd(targetUrl, referer)) {
    return c.text('', 403) // Empty response for blocked trackers/ads
  }

  // Check cache first
  const cached = assetCache.get(targetUrl);
  if (cached) {
    return new Response(cached.buffer, {
      status: 200,
      headers: {
        'Content-Type': cached.contentType,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  const settings = getSettings(c);
  const sessionId = getSessionId(c);
  const targetDomain = new URL(targetUrl).hostname;
  const proxyCookies = getCookiesForDomain(sessionId, targetDomain);

  try {
    const fetchHeaders: Record<string, string> = {
      'User-Agent': settings.userAgent,
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
    };

    if (proxyCookies) {
      fetchHeaders['Cookie'] = proxyCookies;
    }

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: fetchHeaders,
      redirect: 'follow',
      tls: { rejectUnauthorized: false }
    })
    
    saveCookiesFromResponse(sessionId, targetDomain, response);

    const cleanHeaders = new Headers(response.headers)
    cleanHeaders.delete('content-encoding')
    cleanHeaders.delete('content-length')
    cleanHeaders.delete('transfer-encoding')
    cleanHeaders.delete('connection')
    cleanHeaders.delete('content-security-policy')
    cleanHeaders.delete('x-frame-options')
    cleanHeaders.delete('set-cookie')
    
    cleanHeaders.set('Access-Control-Allow-Origin', '*')

    const buffer = await response.arrayBuffer()
    
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Only cache successful GET responses that aren't huge (size limit handled by LRUCache)
    if (response.status === 200) {
      assetCache.set(targetUrl, { buffer, contentType });
    }

    return new Response(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers: cleanHeaders
    })

  } catch (e: any) {
    return c.text(`Asset fetch failed: ${e.message}`, 500)
  }
})
