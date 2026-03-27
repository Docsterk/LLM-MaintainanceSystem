import { useState } from 'react';

export default function QueryInput({ onSubmit, disabled }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery('');
    }
  };

  const quickTags = ['Unit #403', 'Engine Cover', 'Hydraulics', 'Landing Gear'];

  return (
    <div className="query-card">
      <div className="card-label">Task Description</div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the disassembly task or problem... e.g. Engine cover removal on Unit #403"
          className="query-textarea"
          rows="3"
          disabled={disabled}
        />

        <div className="tag-row">
          {quickTags.map(tag => (
            <button
              key={tag}
              type="button"
              className="tag"
              style={{ cursor: 'pointer', border: 'none' }}
              onClick={() => setQuery(prev => prev ? `${prev} ${tag}` : tag)}
              disabled={disabled}
            >
              <span className="tag-dot"></span>
              {tag}
            </button>
          ))}
        </div>

        <div style={{ marginTop: '12px' }}>
          <button
            type="submit"
            disabled={disabled || !query.trim()}
            className="button button-primary"
          >
            {disabled ? '⟳  Processing…' : '⚡  Analyze Task'}
          </button>
        </div>
      </form>
    </div>
  );
}
