import { Hono } from 'hono'
import { isValidUrl, isPrivateIP, ensureUrl } from '../utils/url'
import { rewriteHtml } from '../utils/rewriter'
import { isAd } from '../utils/adblocker'
import { getSettings } from '../utils/settings'
import { getSessionId, getCookiesForDomain, saveCookiesFromResponse } from '../utils/session'

export const browseRoute = new Hono()

browseRoute.get('/browse', async (c) => {
  const urlParam = c.req.query('url')
  
  if (!urlParam) {
    return c.html(
      <div style={{ color: 'white', background: '#0a0a0f', padding: '20px', height: '100vh' }}>
        <h2>Error: URL is required</h2>
        <a href="/" style={{ color: '#3b82f6' }}>Try Again</a>
      </div>,
      400
    )
  }

  const targetUrl = ensureUrl(urlParam)

  if (!isValidUrl(targetUrl)) {
    return c.html(
      <div style={{ color: 'white', background: '#0a0a0f', padding: '20px', height: '100vh' }}>
        <h2>Error: Invalid URL</h2>
        <a href="/" style={{ color: '#3b82f6' }}>Try Again</a>
      </div>,
      400
    )
  }

  if (isPrivateIP(targetUrl)) {
    return c.html(
      <div style={{ color: 'white', background: '#0a0a0f', padding: '20px', height: '100vh' }}>
        <h2>Error: Forbidden URL</h2>
        <a href="/" style={{ color: '#3b82f6' }}>Try Again</a>
      </div>,
      403
    )
  }

  if (isAd(targetUrl, c.req.header('referer') || targetUrl)) {
    return c.text('Blocked by Adblocker', 403)
  }

  const settings = getSettings(c);
  const sessionId = getSessionId(c);
  const targetDomain = new URL(targetUrl).hostname;
  const proxyCookies = getCookiesForDomain(sessionId, targetDomain);

  try {
    const fetchHeaders: Record<string, string> = {
      'User-Agent': settings.userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"'
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
    
    // Save any new cookies set by the target
    saveCookiesFromResponse(sessionId, targetDomain, response);

    const contentType = response.headers.get('content-type') || ''
    const isHtml = contentType.includes('text/html')

    const cleanHeaders = new Headers(response.headers)
    cleanHeaders.delete('content-encoding')
    cleanHeaders.delete('content-length')
    cleanHeaders.delete('transfer-encoding')
    cleanHeaders.delete('connection')
    cleanHeaders.delete('content-security-policy')
    cleanHeaders.delete('x-frame-options')
    cleanHeaders.delete('set-cookie') // Don't leak proxied cookies to the user's browser directly
    
    cleanHeaders.set('Access-Control-Allow-Origin', '*')

    const buffer = await response.arrayBuffer()

    if (!isHtml) {
      return new Response(buffer, {
        status: response.status,
        headers: cleanHeaders
      })
    }

    cleanHeaders.set('content-type', 'text/html; charset=utf-8')

    const cleanResponse = new Response(buffer, {
      status: response.status,
      statusText: response.statusText,
      headers: cleanHeaders
    })

    const finalUrl = response.url
    return rewriteHtml(cleanResponse, finalUrl, settings.disableJs)

  } catch (e: any) {
    return c.html(
      <div style={{ color: 'white', background: '#0a0a0f', padding: '20px', height: '100vh', fontFamily: 'sans-serif' }}>
        <h2>Failed to fetch URL</h2>
        <p>{e.message}</p>
        <br />
        <a href="/" style={{ 
          padding: '10px 20px', 
          background: '#3b82f6', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '5px' 
        }}>Try Again</a>
      </div>,
      500
    )
  }
})
