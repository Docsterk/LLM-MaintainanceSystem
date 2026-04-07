// src/components/Footer.jsx
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', padding: '10px 0' }}>

        {/* Left — brand + dev on one line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span className="footer-brand-name" style={{ marginBottom: 0 }}>
            FedEx Maintenance Copilot
            <span className="footer-internal-badge">Internal Tool</span>
          </span>
          <span style={{ color: 'var(--border)', fontSize: '12px' }}>|</span>
          <span className="footer-dev" style={{ marginBottom: 0 }}>Swinburne Students / Group Six</span>
        </div>

        {/* Right — links on one line */}
        <div className="footer-links" style={{ flexWrap: 'nowrap' }}>
          <a href="/privacy"        className="footer-link">Privacy</a>
          <a href="/acceptable-use" className="footer-link">Acceptable Use</a>
          <a href="/support"        className="footer-link">IT Support</a>
          <a href="/report"         className="footer-link">Report Issue</a>
        </div>
      </div>

      {/* Bottom — single line */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '6px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
        <span className="footer-copy">© {year} Swinburne Students / Group Six. All rights reserved. Internal use only.</span>
        <span className="footer-ai-notice">
          <span className="footer-ai-dot" />
          Not affiliated with FedEx Corporation. "FedEx" is a registered trademark of Federal Express Corporation.
        </span>
      </div>
    </footer>
  );
};

export default Footer;