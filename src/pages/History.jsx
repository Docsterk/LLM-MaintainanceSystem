// src/pages/History.jsx
import { useState, useEffect } from 'react';

export default function History() {
  const [history, setHistory] = useState([]);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('queryHistory') || '[]');
    setHistory(stored);
  }, []);

  const deleteEntry = (id) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem('queryHistory', JSON.stringify(updated));
  };

  const clearAll = () => {
    setHistory([]);
    localStorage.removeItem('queryHistory');
  };

  const filtered = history.filter(h =>
    h.text.toLowerCase().includes(search.toLowerCase())
  );

  const formatTime = (iso) => {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60)   return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };

  const grouped = filtered.reduce((acc, entry) => {
    const d = new Date(entry.timestamp);
    const now = new Date();
    const diff = (now - d) / 1000;
    const key = diff < 86400 ? 'Today' : diff < 172800 ? 'Yesterday' : 'Older';
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});

  return (
    <div style={{
      width: '100%', maxWidth: '720px', margin: '0 auto',
      padding: '24px 20px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)' }}>
            History
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Your recent maintenance queries
          </div>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: 'rgba(244,67,54,0.08)', border: '1px solid rgba(244,67,54,0.25)',
              color: 'var(--red)', borderRadius: '8px', padding: '7px 14px',
              fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Search bar */}
      {history.length > 0 && (
        <input
          type="text"
          className="input"
          placeholder="Search history…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      )}

      {/* Empty state */}
      {history.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          border: '1px dashed var(--border)', borderRadius: '10px',
          color: 'var(--text-muted)', fontSize: '12px',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🕐</div>
          <div style={{ fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            No history yet
          </div>
          <div>Your queries will appear here after you use the dashboard</div>
        </div>
      )}

      {/* Grouped results */}
      {Object.entries(grouped).map(([group, entries]) => (
        <div key={group}>
          <div style={{
            fontSize: '10px', fontWeight: '700', color: 'var(--text-muted)',
            textTransform: 'uppercase', letterSpacing: '1px',
            fontFamily: 'monospace', marginBottom: '8px',
          }}>
            {group}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {entries.map(entry => (
              <div key={entry.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '12px 14px',
                transition: 'box-shadow 0.15s',
              }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>🔍</span>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '13px', color: 'var(--text-primary)',
                    fontWeight: '500', whiteSpace: 'nowrap',
                    overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {entry.text}
                  </div>
                  <div style={{
                    fontSize: '10px', color: 'var(--text-muted)',
                    fontFamily: 'monospace', marginTop: '2px',
                  }}>
                    {formatTime(entry.timestamp)}
                  </div>
                </div>

                <button
                  onClick={() => deleteEntry(entry.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', fontSize: '14px', padding: '2px 6px',
                    borderRadius: '4px', flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* No search results */}
      {history.length > 0 && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)', fontSize: '12px' }}>
          No results for "{search}"
        </div>
      )}
    </div>
  );
}