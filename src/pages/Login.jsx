import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const role = email.includes('admin') ? 'admin' : 'expert';
    localStorage.setItem('user', JSON.stringify({ email, role }));
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <div className="login-logo-mark">FX</div>
        </div>
        <div className="login-title">FedEx Copilot</div>
        <div className="login-sub">Maintenance Disassembly Assistant · Sign in to continue</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="your@fedex.com"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: '6px' }}>
            <button
              type="submit"
              className="button button-primary"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '20px', padding: '12px', background: 'var(--bg-elevated)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <div className="card-label" style={{ marginBottom: '8px' }}>Demo Accounts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              ['admin@fedex.com', 'Admin', 'badge-purple'],
              ['expert@fedex.com', 'Expert Technician', 'badge-blue'],
            ].map(([em, label, cls]) => (
              <div key={em} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{em}</span>
                <span className={`badge ${cls}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="audit-notice" style={{ marginTop: '16px' }}>
          🔒 Secured with Role-Based Access Control
        </div>
      </div>
    </div>
  );
}
