import { useState, useEffect } from 'react';

const ALL_ALERTS = [
  {
    id: 1, type: 'alert', icon: '🚨',
    title: 'Time Threshold Exceeded',
    message: 'Disassembly on Unit #403 has exceeded time threshold. Supervisor has been automatically notified.',
    timestamp: '2 min ago', status: 'Sent', statusClass: 'badge-green',
  },
  {
    id: 2, type: 'priority', icon: '📊',
    title: 'Priority Adjustment',
    message: 'Maintenance task ID #1024 has been adjusted to HIGH PRIORITY based on equipment status and overdue schedule.',
    timestamp: '8 min ago', status: 'Acknowledged', statusClass: 'badge-blue',
  },
  {
    id: 3, type: 'share', icon: '📗',
    title: 'Knowledge Base Updated',
    message: 'Best practice for engine cover removal (Boeing 767F) has been updated in the shared knowledge base. New torque specs apply.',
    timestamp: '15 min ago', status: null, statusClass: null,
  },
  {
    id: 4, type: 'info', icon: 'ℹ️',
    title: 'Task Approved & Logged',
    message: 'Recommendation for Task #1022 was approved and logged by T. Reyes (Supervisor). Audit entry created.',
    timestamp: '32 min ago', status: 'Logged', statusClass: 'badge-green',
  },
  {
    id: 5, type: 'alert', icon: '🚨',
    title: 'Anomaly Detected',
    message: 'Unit #388 — Hydraulic system anomaly detected during pre-flight check. Maintenance request auto-created.',
    timestamp: '1 hr ago', status: 'Sent', statusClass: 'badge-green',
  },
];

const TYPE_CONFIG = {
  alert:    { iconClass: 'alert',    badgeClass: 'badge-red',    label: 'Alert'    },
  priority: { iconClass: 'priority', badgeClass: 'badge-orange', label: 'Priority' },
  share:    { iconClass: 'share',    badgeClass: 'badge-green',  label: 'Info'     },
  info:     { iconClass: 'info',     badgeClass: 'badge-blue',   label: 'System'   },
};

export default function Activity() {
  const [alerts, setAlerts]       = useState([]);
  const [filter, setFilter]       = useState('all');
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    setTimeout(() => { setAlerts(ALL_ALERTS); setLoading(false); }, 800);
  }, []);

  const filtered = filter === 'all'
    ? alerts
    : alerts.filter(a => a.type === filter);

  const tabs = [
    { key: 'all',      label: 'All' },
    { key: 'alert',    label: 'Alerts' },
    { key: 'priority', label: 'Priority' },
    { key: 'info',     label: 'System' },
  ];

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="flex-between">
          <div>
            <div className="page-title">Activity &amp; Alerts</div>
            <div className="page-subtitle">Real-time feed from all active agents</div>
          </div>
          <div className="live-dot">
            <span className="pulse-dot"></span> Live
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`filter-tab ${filter === tab.key ? 'active' : ''}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontSize: '12px' }}>
          Loading activity feed…
        </div>
      )}

      {!loading && filtered.map(alert => {
        const cfg = TYPE_CONFIG[alert.type];
        return (
          <div key={alert.id} className="feed-item">
            <div className={`feed-icon ${cfg.iconClass}`}>{alert.icon}</div>
            <div className="feed-content">
              <div className="feed-top">
                <span className={`badge ${cfg.badgeClass}`}>{cfg.label}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  {alert.title}
                </span>
                <span className="feed-time">{alert.timestamp}</span>
              </div>
              <div className="feed-text">{alert.message}</div>
              <div className="feed-meta">
                {alert.status && (
                  <span className={`badge ${alert.statusClass}`}>{alert.status}</span>
                )}
                <span className="feed-link">View Details →</span>
              </div>
            </div>
          </div>
        );
      })}

      {!loading && filtered.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '40px',
          color: 'var(--text-muted)', fontSize: '12px',
          border: '1px dashed var(--border)', borderRadius: '10px'
        }}>
          No {filter === 'all' ? '' : filter} alerts at this time
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace', marginTop: '8px' }}>
          Showing {filtered.length} of {alerts.length} events today
        </div>
      )}
    </div>
  );
}
