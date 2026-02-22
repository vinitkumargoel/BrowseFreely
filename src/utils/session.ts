import { Context } from 'hono'
import { getCookie, setCookie } from 'hono/cookie'

// In-memory session store (SessionID -> Domain -> CookieString)
// For a production app, use Redis.
const sessions = new Map<string, Map<string, string>>();

export function getSessionId(c: Context): string {
  let sid = getCookie(c, 'bf_session');
  if (!sid) {
    sid = crypto.randomUUID();
    setCookie(c, 'bf_session', sid, { path: '/', httpOnly: true, secure: true, sameSite: 'Lax' });
  }
  return sid;
}

export function getCookiesForDomain(sessionId: string, domain: string): string {
  const session = sessions.get(sessionId);
  if (!session) return '';
  return session.get(domain) || '';
}

export function saveCookiesFromResponse(sessionId: string, domain: string, response: Response) {
  const setCookies = response.headers.getSetCookie ? response.headers.getSetCookie() : [];
  if (!setCookies || setCookies.length === 0) return;

  let session = sessions.get(sessionId);
  if (!session) {
    session = new Map();
    sessions.set(sessionId, session);
  }

  // Very naive cookie parsing (just storing the key=value part)
  const existingCookiesStr = session.get(domain) || '';
  const existingCookies = new Map<string, string>();
  
  existingCookiesStr.split(';').forEach(c => {
    const parts = c.split('=');
    if (parts.length >= 2) {
      existingCookies.set(parts[0].trim(), parts.slice(1).join('=').trim());
    }
  });

  for (const c of setCookies) {
    const mainPart = c.split(';')[0];
    const parts = mainPart.split('=');
    if (parts.length >= 2) {
      existingCookies.set(parts[0].trim(), parts.slice(1).join('=').trim());
    }
  }

  const newCookieStr = Array.from(existingCookies.entries()).map(([k, v]) => `${k}=${v}`).join('; ');
  session.set(domain, newCookieStr);
}

export function clearSession(sessionId: string) {
  sessions.delete(sessionId);
}
