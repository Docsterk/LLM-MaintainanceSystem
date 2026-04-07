// src/pages/Admin.jsx
import { useState } from 'react';

const INITIAL_USERS = [
  { id: 1, initials: 'AR', name: 'Adil Rumy',                           email: 'adil.rumy@fedex.com',           role: 'admin'        },
  { id: 2, initials: 'PC', name: 'Prince Chikukwa',                     email: 'prince.chikukwa@fedex.com',     role: 'expert'       },
  { id: 3, initials: 'AL', name: 'Andrei Lo Wen Heng',                  email: 'andrei.lo@fedex.com',           role: 'expert'       },
  { id: 4, initials: 'AA', name: 'Aichner Anak Abert Achilles Nunong',  email: 'aichner.nunong@fedex.com',      role: 'intermediate' },
  { id: 5, initials: 'PC', name: 'Phillip Anthony Christopher',         email: 'phillip.christopher@fedex.com', role: 'beginner'     },
];

const AUDIT_LOGS = [
  { id: 1, timestamp: '27 Mar · 14:35', user: 'Andrei Lo Wen Heng',                  action: 'Approved Recommendation', taskId: '#1024', status: 'Approved' },
  { id: 2, timestamp: '27 Mar · 12:10', user: 'Aichner Anak Abert Achilles Nunong',  action: 'Override / Rejected',     taskId: '#1019', status: 'Rejected' },
  { id: 3, timestamp: '26 Mar · 09:22', user: 'Aichner Anak Abert Achilles Nunong',  action: 'Requested Revision',      taskId: '#1017', status: 'Revised'  },
];

const ROLE_BADGE = {
  admin:        'badge-purple',
  expert:       'badge-blue',
  intermediate: 'badge-green',
  beginner:     'badge-gray',
};

const ROLE_PILL_STYLE = (active, role) => ({
  padding: '3px 10px',
  borderRadius: '20px',
  fontSize: '10px',
  fontWeight: '700',
  fontFamily: 'monospace',
  textTransform: 'uppercase',
  letterSpacing: '0.4px',
  cursor: 'pointer',
  transition: 'all 0.15s',
  border: active
    ? `1px solid ${role === 'expert' ? 'var(--blue)' : role === 'intermediate' ? 'var(--green)' : 'var(--text-muted)'}`
    : '1px solid var(--border)',
  background: active
    ? role === 'expert'       ? 'rgba(41,121,255,0.12)'
    : role === 'intermediate' ? 'rgba(0,200,83,0.10)'
    :                           'var(--bg-elevated)'
    : 'transparent',
  color: active
    ? role === 'expert'       ? 'var(--blue)'
    : role === 'intermediate' ? 'var(--green)'
    :                           'var(--text-muted)'
    : 'var(--text-muted)',
});

const AGENTS = [
  { name: 'Data Retrieval',  icon: '📚', bg: 'rgba(41,121,255,0.12)' },
  { name: 'Safety Agent',    icon: '🛡',  bg: 'rgba(0,200,83,0.12)'  },
  { name: 'Recommendation',  icon: '🧠', bg: 'rgba(77,20,140,0.15)'  },
  { name: 'Alert Agent',     icon: '🚨', bg: 'rgba(244,67,54,0.12)'  },
  { name: 'Priority Agent',  icon: '📊', bg: 'rgba(255,102,0,0.12)'  },
  { name: 'Knowledge Agent', icon: '📗', bg: 'rgba(0,200,83,0.12)'   },
];

export default function Admin() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [tab, setTab]     = useState('users');

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const statusClass = {
    Approved: 'status-approved',
    Rejected: 'status-rejected',
    Revised:  'status-revised',
  };

  return (
    <div className="page-wrapper-wide">

      {/* Header */}
      <div className="page-header">
        <div className="flex-between">
          <div>
            <div className="page-title">System Administration</div>
            <div className="page-subtitle">User management · Audit log · Agent monitoring</div>
          </div>
          <span className="badge badge-purple">ADMIN ACCESS</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
        {[
          { key: 'users',  label: '👥 User Management' },
          { key: 'audit',  label: '🔒 Audit Log'        },
          { key: 'agents', label: '🤖 Agent Status'     },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 18px', fontSize: '12px', fontWeight: '600',
              background: 'none', border: 'none', fontFamily: 'inherit',
              borderBottom: `2px solid ${tab === t.key ? 'var(--fedex-orange)' : 'transparent'}`,
              color: tab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.15s', marginBottom: '-1px',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── USER MANAGEMENT ── */}
      {tab === 'users' && (
        <div>
          <div className="section-header">
            <div>
              <div className="section-title">User Management</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                {users.length} users · click role pills to reassign
              </div>
            </div>
            <button className="button button-primary button-sm">+ Add User</button>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Change Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>

                    {/* User */}
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-sm">{user.initials}</div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          {user.role === 'admin' && (
                            <div style={{ fontSize: '9px', color: 'var(--fedex-purple)', fontFamily: 'monospace', marginTop: '1px' }}>
                              PROTECTED
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td>
                      <span className="user-email">{user.email}</span>
                    </td>

                    {/* Current role badge */}
                    <td>
                      <span className={`badge ${ROLE_BADGE[user.role]}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>

                    {/* Role pills */}
                    <td>
                      {user.role !== 'admin' ? (
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {['expert', 'intermediate', 'beginner'].map(r => (
                            <button
                              key={r}
                              onClick={() => handleRoleChange(user.id, r)}
                              style={ROLE_PILL_STYLE(user.role === r, r)}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                          — locked
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <button className="table-action edit">Edit</button>
                        {user.role !== 'admin' && (
                          <button
                            className="table-action del"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── AUDIT LOG ── */}
      {tab === 'audit' && (
        <div>
          <div className="section-header">
            <div>
              <div className="section-title">Audit Log</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                Immutable record of all HITL decisions
              </div>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--blue)', fontFamily: 'monospace', cursor: 'pointer' }}>
              Export CSV ↓
            </span>
          </div>

          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Task ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT_LOGS.map(log => (
                  <tr key={log.id}>
                    <td>
                      <span className="mono" style={{ fontSize: '11px' }}>{log.timestamp}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '12px' }}>
                        {log.user}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{log.action}</span>
                    </td>
                    <td>
                      <span className="mono" style={{ color: 'var(--fedex-orange)', fontWeight: '600', fontSize: '11px' }}>
                        {log.taskId}
                      </span>
                    </td>
                    <td>
                      <span className={statusClass[log.status]} style={{ fontWeight: '700', fontSize: '11px' }}>
                        {log.status === 'Approved' ? '✓ ' : log.status === 'Rejected' ? '✕ ' : '✏ '}
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '10px', color: 'var(--text-muted)',
            fontFamily: 'monospace', marginTop: '8px',
          }}>
            🔒 All HITL decisions are immutably recorded · Timestamp · User · Role · Action · Task reference
          </div>
        </div>
      )}

      {/* ── AGENT STATUS ── */}
      {tab === 'agents' && (
        <div>
          <div className="section-header">
            <div>
              <div className="section-title">Agent Status Overview</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '2px' }}>
                {AGENTS.length} agents monitored
              </div>
            </div>
            <div className="live-dot">
              <span className="pulse-dot"></span>
              All systems operational
            </div>
          </div>

          <div className="agent-grid">
            {AGENTS.map(agent => (
              <div key={agent.name} className="agent-status-card online">
                <div className="agent-status-icon" style={{ background: agent.bg }}>
                  {agent.icon}
                </div>
                <div>
                  <div className="agent-status-name">{agent.name}</div>
                  <div className="agent-status-val">
                    <span className="pulse-dot" style={{ width: '5px', height: '5px' }}></span>
                    Online
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* System summary */}
          <div style={{
            marginTop: '16px', padding: '12px 16px',
            background: 'rgba(0,200,83,0.06)', border: '1px solid rgba(0,200,83,0.2)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ fontSize: '16px' }}>✅</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--green)' }}>
                All {AGENTS.length} agents online
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '1px' }}>
                Last checked: just now · Auto-refreshes every 30s
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}