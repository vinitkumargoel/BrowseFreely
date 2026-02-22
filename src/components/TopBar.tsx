export const TopBar = ({ currentUrl, disableJs }: { currentUrl: string, disableJs: boolean }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '48px',
        backgroundColor: 'rgba(9, 9, 11, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        boxSizing: 'border-box',
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f4f4f5'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 0%', minWidth: '0' }}>
        <a
          href="/"
          data-native-proxy-link="true"
          title="Go to Homepage"
          style={{
            color: '#f4f4f5',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          <span style={{ display: 'none' }} className="brand-text">BrowseFreely</span>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 600px) {
              .brand-text { display: inline !important; }
              .js-text { display: inline !important; }
            }
            @media (max-width: 599px) {
              .js-text { display: none !important; }
            }
          ` }} />
        </a>
      </div>

      <form
        action="/browse"
        method="GET"
        data-native-proxy-form="true"
        style={{
          flex: '0 1 500px',
          display: 'flex',
          margin: '0 16px',
          position: 'relative'
        }}
      >
        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <input
          type="text"
          name="url"
          value={currentUrl}
          style={{
            flex: 1,
            width: '100%',
            padding: '6px 12px 6px 32px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: '#f4f4f5',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.boxShadow = '0 0 0 1px #3b82f6';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button type="submit" style={{ display: 'none' }}>Go</button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', flex: '1 1 0%', justifyContent: 'flex-end', gap: '12px', minWidth: '0' }}>
        
        {/* JS Toggle Indicator */}
        <div title="JavaScript is currently enabled/disabled. Change this on the homepage." style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          fontWeight: 500,
          color: disableJs ? '#ef4444' : '#10b981',
          background: disableJs ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          padding: '4px 8px',
          borderRadius: '4px',
          border: `1px solid ${disableJs ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
          cursor: 'help'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: disableJs ? '#ef4444' : '#10b981' }}></span>
          <span className="js-text">JS {disableJs ? 'Off' : 'On'}</span>
        </div>

        <a
          href="/api/clear-session"
          data-native-proxy-link="true"
          title="Clear Session Cookies"
          style={{
            color: '#a1a1aa',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'color 0.2s ease, background-color 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#f4f4f5';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#a1a1aa';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </a>

        <a
          href="/"
          data-native-proxy-link="true"
          title="Close Session"
          style={{
            color: '#a1a1aa',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            borderRadius: '4px',
            transition: 'color 0.2s ease, background-color 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = '#f4f4f5';
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = '#a1a1aa';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </a>
      </div>
    </div>
  )
}
