import { resolveUrl } from './url'
import { TopBar } from '../components/TopBar'
import { FINGERPRINT_SPOOF_SCRIPT } from './fingerprint'

export function rewriteHtml(htmlStream: ReadableStream | Response, baseUrl: string, disableJs: boolean): Response {
  const topBarHtml = TopBar({ currentUrl: baseUrl, disableJs }).toString()

  const rewriter = new HTMLRewriter()

  rewriter.on('body', {
    element(el) {
      el.prepend(topBarHtml, { html: true })
      el.prepend('<div style="height: 48px; width: 100%;"></div>', { html: true })
    }
  })

  rewriter.on('head', {
    element(el) {
      el.append('<style>body { margin-top: 48px !important; }</style>', { html: true })
      // NextJS / React interceptor for fetch and dynamic imports that break out of BrowseFreely
      el.append(`
        <script>
          ${FINGERPRINT_SPOOF_SCRIPT}
          (function() {
            const originalFetch = window.fetch;
            window.fetch = function() {
              if (typeof arguments[0] === 'string' && arguments[0].startsWith('/')) {
                arguments[0] = '/asset?url=' + encodeURIComponent(new URL(arguments[0], '${baseUrl}').href);
              }
              return originalFetch.apply(this, arguments);
            };
          })();
        </script>
      `, { html: true })
    }
  })

  // Strip JS if requested
  if (disableJs) {
    rewriter.on('script', {
      element(el) {
        el.remove();
      }
    })
  }

  rewriter.on('a', {
    element(el) {
      const href = el.getAttribute('href')
      // Let the native proxy TopBar links bypass the rewriter completely!
      if (el.hasAttribute('data-native-proxy-link')) {
        return;
      }
      
      if (href) {
        const absolute = resolveUrl(baseUrl, href)
        if (absolute.startsWith('http') && !absolute.includes('/browse?url=')) {
          el.setAttribute('href', `/browse?url=${encodeURIComponent(absolute)}`)
        } else {
          el.setAttribute('href', absolute)
        }
      }
    }
  })

  rewriter.on('form', {
    element(el) {
      // Let native proxy forms bypass the rewriter completely
      if (el.hasAttribute('data-native-proxy-form')) {
        return;
      }
      
      const action = el.getAttribute('action')
      if (action) {
        const absolute = resolveUrl(baseUrl, action)
        if (absolute.startsWith('http') && !absolute.includes('/browse?url=')) {
          el.setAttribute('action', `/browse?url=${encodeURIComponent(absolute)}`)
        }
      } else {
        el.setAttribute('action', `/browse?url=${encodeURIComponent(baseUrl)}`)
      }
    }
  })

  rewriter.on('img, iframe, source, track, link', {
    element(el) {
      const srcAttr = el.hasAttribute('src') ? 'src' : 'href'
      const src = el.getAttribute(srcAttr)
      if (src) {
        const absolute = resolveUrl(baseUrl, src)
        if (absolute.startsWith('http') && !absolute.includes('/asset?url=')) {
          el.setAttribute(srcAttr, `/asset?url=${encodeURIComponent(absolute)}`)
        } else {
          el.setAttribute(srcAttr, absolute)
        }
      }
      
      const srcset = el.getAttribute('srcset')
      if (srcset) {
        el.removeAttribute('srcset')
      }
    }
  })
  
  if (!disableJs) {
    rewriter.on('script', {
      element(el) {
        const src = el.getAttribute('src')
        if (src) {
          const absolute = resolveUrl(baseUrl, src)
          if (absolute.startsWith('http') && !absolute.includes('/asset?url=')) {
            el.setAttribute('src', `/asset?url=${encodeURIComponent(absolute)}`)
          } else {
            el.setAttribute('src', absolute)
          }
        }
      }
    })
  }

  return rewriter.transform(htmlStream instanceof Response ? htmlStream : new Response(htmlStream))
}
