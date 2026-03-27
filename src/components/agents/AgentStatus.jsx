import { useState, useEffect } from 'react';

const AGENTS = [
  { name: 'Data Retrieval Agent',    status: 'Searching manuals…',      icon: '📚', iconClass: 'blue'   },
  { name: 'Safety Validation Agent', status: 'Checking protocols…',     icon: '🛡', iconClass: 'green'  },
  { name: 'Recommendation Agent',    status: 'Generating plan…',        icon: '🧠', iconClass: 'purple' },
];

export default function AgentStatus() {
  const [currentStep, setCurrentStep] = useState(0);
  const [pct, setPct] = useState(18);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev < AGENTS.length ? prev + 1 : prev));
    }, 1600);
    const pctTimer = setInterval(() => {
      setPct(prev => Math.min(prev + Math.random() * 8, 92));
    }, 400);
    return () => { clearInterval(stepTimer); clearInterval(pctTimer); };
  }, []);

  const getState = (idx) => {
    if (idx < currentStep) return 'done';
    if (idx === currentStep) return 'active';
    return 'queued';
  };

  return (
    <div className="agent-container">
      <div className="agent-header">Multi-Agent Collaboration Pipeline</div>

      {AGENTS.map((agent, idx) => {
        const state = getState(idx);
        return (
          <div key={agent.name} className={`agent-item ${state}`}>
            <div className={`agent-icon ${agent.iconClass}`}>{agent.icon}</div>
            <div className="agent-info">
              <div className="agent-name">{agent.name}</div>
              <div className={`agent-status ${state}`}>
                {state === 'done'   && '✓ Complete'}
                {state === 'active' && agent.status}
                {state === 'queued' && 'Awaiting previous agent…'}
              </div>
            </div>
            <span className={`badge ${
              state === 'done'   ? 'badge-green' :
              state === 'active' ? 'badge-blue'  : 'badge-gray'
            }`}>
              {state === 'done' ? 'Done' : state === 'active' ? 'Active' : 'Queued'}
            </span>
          </div>
        );
      })}

      <div className="progress-wrap" style={{ marginTop: '14px' }}>
        <div className="progress-label">
          <span>Processing query…</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%`, animation: 'none' }} />
        </div>
      </div>
      <div className="progress-hint">Estimated response: 1–2 min · Please do not navigate away</div>
    </div>
  );
}
