// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Admin from './pages/Admin';
import History from './pages/History';
import Footer from './components/Footer';

const SLIDES = [
  '/backgrounds/bg1.jpg',
  '/backgrounds/bg2.jpg',
  '/backgrounds/bg3.jpg',
  '/backgrounds/bg4.jpg',
  '/backgrounds/bg5.jpg',
  '/backgrounds/bg6.jpg',
  '/backgrounds/bg7.jpg',
  '/backgrounds/bg8.jpg',
];

function BgSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext]       = useState(1);
  const [fading, setFading]   = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length);
        setNext(n => (n + 1) % SLIDES.length);
        setFading(false);
      }, 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const base = {
    position: 'fixed',
    inset: 0,
    zIndex: -1,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <>
      <div style={{ ...base, backgroundImage: `url(${SLIDES[current]})`, opacity: 0.05 }} />
      <div style={{ ...base, backgroundImage: `url(${SLIDES[next]})`, opacity: fading ? 0.05 : 0, transition: 'opacity 1000ms ease-in-out' }} />
    </>
  );
}

function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
}

function Layout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const initials = user?.email
    ? user.email.split('@')[0].slice(0, 2).toUpperCase()
    : 'U';

  const roleLabel = {
    admin:        'System Admin',
    expert:       'Expert Technician',
    intermediate: 'Intermediate Tech',
    beginner:     'Beginner Tech',
  }[user?.role] || 'Technician';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <BgSlideshow />

      <nav className="nav">
        <div className="nav-brand">
          <img src="/logo.png" alt="FedEx Copilot Logo" className="nav-logo" />
          <span className="nav-brand-text">Maintenance Copilot</span>
        </div>

        <div className="nav-links">
          <Link
            to="/dashboard"
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link
            to="/activity"
            className={`nav-link ${location.pathname === '/activity' ? 'active' : ''}`}
          >
            Activity
          </Link>
          <Link
            to="/history"
            className={`nav-link ${location.pathname === '/history' ? 'active' : ''}`}
          >
            History
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
            >
              Admin
            </Link>
          )}
        </div>

        <div className="nav-right">
          <div className="nav-user">
            <div className="nav-avatar">{initials}</div>
            <div className="nav-user-info">
              <div className="nav-user-name">{user?.email?.split('@')[0] || 'User'}</div>
              <div className="nav-user-role">{roleLabel}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      <main style={{ flex: '1 1 auto', display: 'block', width: '100%', minWidth: 0, overflow: 'auto' }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute allowedRoles={['expert', 'intermediate', 'beginner', 'admin']}>
            <Layout><Dashboard /></Layout>
          </PrivateRoute>
        } />
        <Route path="/activity" element={
          <PrivateRoute allowedRoles={['expert', 'intermediate', 'beginner', 'admin']}>
            <Layout><Activity /></Layout>
          </PrivateRoute>
        } />
        <Route path="/history" element={
          <PrivateRoute allowedRoles={['expert', 'intermediate', 'beginner', 'admin']}>
            <Layout><History /></Layout>
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <Layout><Admin /></Layout>
          </PrivateRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;