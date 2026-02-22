import { UserSettings } from '../utils/settings'

export const HomePage = ({ settings }: { settings: UserSettings }) => {
  const commonUserAgents = [
    { label: 'Default (Desktop Chrome)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36' },
    { label: 'macOS Safari', value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15' },
    { label: 'Windows Firefox', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0' },
    { label: 'iPhone Safari', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' },
    { label: 'Android Chrome', value: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36' },
    { label: 'Tor Browser', value: 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0' },
  ];

  return (
    <main style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '80px 24px' 
    }}>
      <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        
        {/* Status Badge */}
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '6px 12px', 
          background: 'rgba(16, 185, 129, 0.1)', 
          borderRadius: '99px', 
          border: '1px solid rgba(16, 185, 129, 0.2)', 
          marginBottom: '32px', 
          fontSize: '13px', 
          fontWeight: 500,
          color: '#10b981' 
        }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></span>
          Proxy network operational
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(40px, 6vw, 64px)', 
          fontWeight: 700, 
          letterSpacing: '-0.03em', 
          margin: '0 0 20px 0', 
          lineHeight: 1.1 
        }}>
          Browse the web,<br/>
          <span style={{ color: 'var(--text-muted)' }}>without the noise.</span>
        </h1>
        
        <p style={{ 
          fontSize: '18px', 
          color: 'var(--text-muted)', 
          lineHeight: 1.6, 
          maxWidth: '560px', 
          margin: '0 auto 48px auto' 
        }}>
          A fast, private, and ad-free web proxy. Enter any URL below to securely access it through our edge network.
        </p>

        {/* Search Form */}
        <form action="/browse" method="GET" style={{ position: 'relative', maxWidth: '640px', margin: '0 auto 32px auto' }}>
          <div className="focus-ring" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'var(--surface)', 
            border: '1px solid var(--border)', 
            borderRadius: '16px', 
            padding: '6px 6px 6px 20px', 
            transition: 'all 0.2s ease', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)' 
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              name="url" 
              placeholder="Search or enter web address" 
              required
              style={{ 
                flex: 1, 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--text-main)', 
                fontSize: '16px', 
                padding: '14px 16px', 
                outline: 'none' 
              }}
            />
            <button 
              type="submit"
              style={{ 
                padding: '12px 28px', 
                background: 'var(--text-main)', 
                color: 'var(--bg-color)', 
                border: 'none', 
                borderRadius: '10px', 
                cursor: 'pointer', 
                fontSize: '15px', 
                fontWeight: 600, 
                transition: 'transform 0.1s ease, opacity 0.2s ease' 
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Browse
            </button>
          </div>
        </form>

        {/* Enhanced Privacy Settings Form */}
        <form action="/api/settings" method="POST" style={{ 
          maxWidth: '640px', 
          margin: '0 auto 64px auto',
          background: 'rgba(24, 24, 27, 0.6)', /* slightly more transparent surface */
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          textAlign: 'left',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px 24px', 
            borderBottom: '1px solid var(--border)',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            background: 'var(--surface)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>Privacy & Connection</span>
            </div>
            <button type="submit" style={{
              background: 'var(--accent)',
              color: 'white',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >Save Settings</button>
          </div>
          
          {/* Body */}
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* User Agent Section */}
            <div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                fontSize: '13px', 
                fontWeight: 500, 
                color: 'var(--text-main)', 
                marginBottom: '8px' 
              }}>
                Spoof User-Agent
              </label>
              <select name="userAgent" defaultValue={settings.userAgent} style={{
                width: '100%',
                padding: '10px 14px',
                background: 'var(--bg-color)',
                border: '1px solid var(--border)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23a1a1aa%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 14px top 50%',
                backgroundSize: '10px auto'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 0 1px #3b82f6';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#27272a';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {commonUserAgents.map(ua => (
                  <option key={ua.label} value={ua.value}>{ua.label}</option>
                ))}
              </select>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '8px 0 0 0', lineHeight: 1.4 }}>
                Masquerade your proxy traffic to look like it is coming from a different device or browser.
              </p>
            </div>

            <div style={{ height: '1px', background: 'var(--border)', width: '100%' }}></div>
            
            {/* JavaScript Toggle Section */}
            <div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '12px', 
                cursor: 'pointer', 
                userSelect: 'none' 
              }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                  <input type="checkbox" name="disableJs" value="true" defaultChecked={settings.disableJs} style={{
                    appearance: 'none',
                    width: '20px', 
                    height: '20px', 
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    background: 'var(--bg-color)',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s ease'
                  }} 
                  className="custom-checkbox"
                  />
                  <svg className="check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{
                    position: 'absolute',
                    left: '4px',
                    pointerEvents: 'none',
                    opacity: settings.disableJs ? 1 : 0,
                    transition: 'opacity 0.2s ease'
                  }}>
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <style dangerouslySetInnerHTML={{ __html: `
                    .custom-checkbox:checked {
                      background: var(--accent) !important;
                      border-color: var(--accent) !important;
                    }
                    .custom-checkbox:checked + .check-icon {
                      opacity: 1 !important;
                    }
                  ` }} />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '4px' }}>
                    Disable JavaScript (NoScript)
                  </span>
                  <span style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Strips all <code style={{ background: 'var(--bg-color)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: 'var(--text-main)', border: '1px solid var(--border)' }}>&lt;script&gt;</code> tags from the response. 
                    <span style={{ color: '#10b981', display: 'block', marginTop: '4px' }}>✓ Best for maximum privacy and bypassing article paywalls.</span>
                    <span style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>⚠️ Breaks Single Page Applications (React/Next.js/Vue).</span>
                  </span>
                </div>
              </label>
            </div>

          </div>
        </form>

        {/* Feature Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '32px', 
          textAlign: 'left', 
          borderTop: '1px solid var(--border)', 
          paddingTop: '48px' 
        }}>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--border)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>Anti-Fingerprinting</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Your IP is hidden. We automatically spoof Canvas APIs and drop tracing headers.</p>
          </div>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--border)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l8.58-8.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>Session & Cookies</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Proxied cookies are kept in a secure session jar. Clear your session with one click.</p>
          </div>
          <div>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--border)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-main)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0', letterSpacing: '-0.01em' }}>Ad-Free Experience</h3>
            <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Built-in engine strips out analytics, trackers, and annoying popups natively.</p>
          </div>
        </div>

      </div>
    </main>
  )
}
