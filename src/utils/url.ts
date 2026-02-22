export function isValidUrl(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch (e) {
    return false
  }
}

export function isPrivateIP(urlString: string): boolean {
  try {
    const url = new URL(urlString)
    const hostname = url.hostname

    if (hostname === 'localhost') return true

    // Check if it's an IPv4 address
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/
    const match = hostname.match(ipv4Regex)

    if (match) {
      const parts = hostname.split('.').map(Number)
      if (parts[0] === 127) return true // 127.x.x.x
      if (parts[0] === 10) return true // 10.x.x.x
      if (parts[0] === 192 && parts[1] === 168) return true // 192.168.x.x
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true // 172.16.x.x - 172.31.x.x
      if (parts[0] === 169 && parts[1] === 254) return true // Link-local
    }

    // Basic IPv6 check for localhost
    if (hostname === '[::1]' || hostname === '::1') return true
    
    // Simplistic check for IPv6 local/private addresses
    if (hostname.startsWith('[fc') || hostname.startsWith('[fd') || hostname.startsWith('[fe80')) return true

    return false
  } catch (e) {
    return true // Block on parsing error
  }
}

export function ensureUrl(input: string): string {
  input = input.trim();
  
  // If it's a search query (no dots, or explicitly multiple words)
  if (!input.includes('.') || input.includes(' ')) {
    return `https://duckduckgo.com/?q=${encodeURIComponent(input)}&ia=web`;
  }
  
  if (!input.startsWith('http://') && !input.startsWith('https://')) {
    return 'https://' + input
  }
  return input
}

export function encodeUrl(url: string): string {
  return encodeURIComponent(url)
}

export function resolveUrl(baseUrl: string, targetUrl: string): string {
  try {
    if (targetUrl.startsWith('javascript:') || targetUrl.startsWith('mailto:') || targetUrl.startsWith('data:') || targetUrl.startsWith('#')) {
      return targetUrl
    }
    return new URL(targetUrl, baseUrl).href
  } catch (e) {
    return targetUrl
  }
}
