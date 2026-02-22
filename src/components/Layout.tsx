export const Layout = ({ children }: { children: any }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BrowseFreely | Fast, Private Web Proxy</title>
        
        {/* Modern Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --bg-color: #09090b; /* Zinc 950 */
            --text-main: #f4f4f5; /* Zinc 50 */
            --text-muted: #a1a1aa; /* Zinc 400 */
            --accent: #3b82f6; /* Blue 500 */
            --border: #27272a; /* Zinc 800 */
            --surface: #18181b; /* Zinc 900 */
          }
          
          body {
            margin: 0;
            padding: 0;
            background-color: var(--bg-color);
            color: var(--text-main);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          * {
            box-sizing: border-box;
          }
          
          a {
            color: var(--text-main);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          a:hover {
            color: var(--text-muted);
          }
          
          input::placeholder {
            color: #52525b; /* Zinc 500 */
          }
          
          .focus-ring:focus-within {
            border-color: var(--accent) !important;
            box-shadow: 0 0 0 1px var(--accent) !important;
          }

          footer {
            margin-top: auto;
            padding: 32px 24px;
            text-align: center;
            color: var(--text-muted);
            font-size: 13px;
            border-top: 1px solid var(--border);
          }
        ` }} />
      </head>
      <body>
        {children}
        
        <footer>
          <p>&copy; {new Date().getFullYear()} BrowseFreely. Open Source Privacy Tool.</p>
        </footer>
      </body>
    </html>
  )
}
