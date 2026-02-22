import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { clearSession, getSessionId } from '../utils/session'

export const apiRoute = new Hono()

apiRoute.post('/api/settings', async (c) => {
  const body = await c.req.parseBody();
  const settings = {
    userAgent: body.userAgent as string,
    disableJs: body.disableJs === 'true'
  };
  
  setCookie(c, 'bf_settings', encodeURIComponent(JSON.stringify(settings)), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: true,
    secure: true,
    sameSite: 'Lax'
  });
  
  return c.redirect('/');
})

apiRoute.get('/api/clear-session', (c) => {
  const sid = getSessionId(c);
  clearSession(sid);
  return c.redirect('/');
})
