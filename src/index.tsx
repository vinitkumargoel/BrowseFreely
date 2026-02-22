import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { homeRoute } from './routes/home'
import { browseRoute } from './routes/browse'
import { assetRoute } from './routes/asset'
import { apiRoute } from './routes/api'
import { getAdblocker } from './utils/adblocker'
import { resolveUrl } from './utils/url'
import { rateLimit } from './middleware/rateLimit'

const app = new Hono()

// Basic Rate Limiting
app.use('*', rateLimit)

// Global JSX renderer
app.use('*', jsxRenderer(({ children }) => {
  return (
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BrowseFreely</title>
      </head>
      <body>{children}</body>
    </html>
  )
}))

// Add security headers to the BrowseFreely site itself
app.use('*', async (c, next) => {
  await next()
  if (!c.req.path.startsWith('/asset') && !c.req.path.startsWith('/browse')) {
    c.res.headers.set('X-Frame-Options', 'DENY')
    c.res.headers.set('Content-Security-Policy', "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com;")
  }
})

// Register routes
app.route('/', homeRoute)
app.route('/', browseRoute)
app.route('/', assetRoute)
app.route('/', apiRoute)

// Catch-all route to handle missing assets requested directly from the BrowseFreely domain
app.get('*', (c) => {
  const referer = c.req.header('referer')
  if (referer && referer.includes('/browse?url=')) {
    try {
      const urlParam = new URL(referer).searchParams.get('url')
      if (urlParam) {
        let intendedUrl = new URL(c.req.path, urlParam).href;
        if (c.req.query()) {
          const qs = new URLSearchParams(c.req.query()).toString()
          if (qs) {
            intendedUrl += '?' + qs
          }
        }
        return c.redirect(`/asset?url=${encodeURIComponent(intendedUrl)}`)
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }
  return c.text('Not Found', 404)
})

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

console.log(`Starting BrowseFreely server on port ${PORT}...`);

// Background init of adblocker
getAdblocker().catch(console.error)

// Instead of export default, manually start the server to catch port errors explicitly in PM2
try {
  Bun.serve({
    port: PORT,
    fetch: app.fetch,
  });
  console.log(`✅ Server successfully bound to port ${PORT} and is listening!`);
} catch (e) {
  console.error(`❌ FATAL: Could not bind to port ${PORT}. Is it already in use?`, e);
  process.exit(1);
}
