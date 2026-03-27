import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Admin from './pages/Admin';

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
    admin: 'System Admin',
    expert: 'Expert Technician',
    intermediate: 'Intermediate Tech',
    beginner: 'Beginner Tech',
  }[user?.role] || 'Technician';

  return (
    <div>
      <nav className="nav">
        {/* Logo and Brand Section - Updated with image logo */}
        <div className="nav-brand">
          <img 
            src="/logo.png" 
            alt="FedEx Copilot Logo" 
            className="nav-logo"
          />
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
      <main>{children}</main>
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