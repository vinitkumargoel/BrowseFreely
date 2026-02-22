import { Context, Next } from 'hono'

// Extremely simple memory rate limiter
// For a production app, use Redis or an external service.
const ipRequests = new Map<string, { count: number, resetTime: number }>();

// Parse the rate limit from the environment variable, defaulting to 100
const limitEnv = process.env.RATE_LIMIT;
const LIMIT = limitEnv && !isNaN(parseInt(limitEnv, 10)) ? parseInt(limitEnv, 10) : 100;
const WINDOW = 60 * 1000;

export async function rateLimit(c: Context, next: Next) {
  // Use CF-Connecting-IP or X-Forwarded-For if behind a reverse proxy, else fallback
  const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || '127.0.0.1';
  
  const now = Date.now();
  let record = ipRequests.get(ip);
  
  if (!record || record.resetTime < now) {
    record = { count: 0, resetTime: now + WINDOW };
  }
  
  record.count++;
  ipRequests.set(ip, record);
  
  if (record.count > LIMIT) {
    return c.text('Too Many Requests', 429);
  }
  
  await next();
}
