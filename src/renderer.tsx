import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} — JUNE HONG` : 'JUNE HONG — Video & Photo'}</title>
        <meta
          name="description"
          content="JUNE HONG — Videographer &amp; Photographer. Brand film, documentary, advertising, event recap and commercial photography."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,400&display=swap"
          rel="stylesheet"
        />
        <link href="/static/style.css" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
        <link rel="alternate icon" href="/static/favicon.svg" />
      </head>
      <body>
        <div className="page-transition" aria-hidden="true"></div>
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
