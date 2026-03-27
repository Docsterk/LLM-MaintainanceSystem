import { useState } from 'react';

const INITIAL_USERS = [
  { id: 1, initials: 'AR', name: 'Adil Rumy',                  email: 'adil.rumy@fedex.com',           role: 'admin'        },
  { id: 2, initials: 'PC', name: 'Prince Chikukwa',           email: 'prince.chikukwa@fedex.com',    role: 'expert'       },
  { id: 3, initials: 'AL', name: 'Andrei Lo Wen Heng',        email: 'andrei.lo@fedex.com',          role: 'expert'       },
  { id: 4, initials: 'AA', name: 'Aichner Anak Abert Achilles Nunong', email: 'aichner.nunong@fedex.com', role: 'intermediate' },
  { id: 5, initials: 'PC', name: 'Phillip Anthony Christopher',      email: 'phillip.christopher@fedex.com', role: 'beginner'     },
];

const AUDIT_LOGS = [
  { id: 1, timestamp: '27 Mar · 14:35', user: 'Andrei Lo Wen Heng',             action: 'Approved Recommendation', taskId: '#1024', status: 'Approved' },
  { id: 2, timestamp: '27 Mar · 12:10', user: 'Aichner Anak Abert Achilles Nunong', action: 'Override / Rejected',     taskId: '#1019', status: 'Rejected' },
  { id: 3, timestamp: '26 Mar · 09:22', user: 'Aichner Anak Abert Achilles Nunong', action: 'Requested Revision',      taskId: '#1017', status: 'Revised'  },
];

const ROLE_BADGE = {
  admin:        'badge-purple',
  expert:       'badge-blue',
  intermediate: 'badge-green',
  beginner:     'badge-gray',
};

const AGENTS = [
  { name: 'Data Retrieval',  icon: '📚', bg: 'rgba(41,121,255,0.12)'  },
  { name: 'Safety Agent',    icon: '🛡', bg: 'rgba(0,200,83,0.12)'   },
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

  const statusClass = { Approved: 'status-approved', Rejected: 'status-rejected', Revised: 'status-revised' };

  return (
    <div className="page-wrapper-wide">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <div className="page-title">System Administration</div>
            <div className="page-subtitle">User management · Audit log · Agent monitoring</div>
          </div>
          <span className="badge badge-purple">ADMIN ACCESS</span>
        </div>
      </div>

      {/* Tab row */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
        {[
          { key: 'users',  label: '👥 User Management' },
          { key: 'audit',  label: '🔒 Audit Log'       },
          { key: 'agents', label: '🤖 Agent Status'    },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 18px',
              fontSize: '12px', fontWeight: '600',
              background: 'none', border: 'none',
              borderBottom: `2px solid ${tab === t.key ? 'var(--fedex-orange)' : 'transparent'}`,
              color: tab === t.key ? 'var(--text-primary)' : 'var(--text-muted)',
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
              marginBottom: '-1px',
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
            <div className="section-title">User Management</div>
            <button className="button button-primary button-sm">+ Add User</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar-sm">{user.initials}</div>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {user.email}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${ROLE_BADGE[user.role]}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>
                      {user.role !== 'admin' && (
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="role-select"
                        >
                          <option value="expert">Expert</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="beginner">Beginner</option>
                        </select>
                      )}
                    </td>
                    <td>
                      <button className="table-action edit">Edit</button>
                      {user.role !== 'admin' && (
                        <button className="table-action del">Delete</button>
                      )}
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
            <div className="section-title">Audit Log</div>
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
                    <td><span className="mono" style={{ fontSize: '11px' }}>{log.timestamp}</span></td>
                    <td><span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{log.user}</span></td>
                    <td>{log.action}</td>
                    <td><span className="mono" style={{ color: 'var(--fedex-orange)', fontWeight: '600' }}>{log.taskId}</span></td>
                    <td><span className={statusClass[log.status]} style={{ fontWeight: '700', fontSize: '11px' }}>
                      {log.status}
                    </span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '-14px' }}>
            All HITL decisions are immutably recorded · Timestamp · User · Role · Action · Task reference
          </div>
        </div>
      )}

      {/* ── AGENT STATUS ── */}
      {tab === 'agents' && (
        <div>
          <div className="section-header">
            <div className="section-title">Agent Status Overview</div>
            <div className="live-dot"><span className="pulse-dot"></span> All systems operational</div>
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
        </div>
      )}
    </div>
  );
}
