import { useState } from 'react';

const STEPS = [
  { title: 'Power-down & Lockout/Tagout', desc: 'Isolate Unit #403 from power. Apply LOTO tags per OSHA 29 CFR 1910.147.', tag: 'CRITICAL SAFETY', tagClass: 'badge-red' },
  { title: 'Positioning & Support',       desc: 'Position maintenance platform. Secure engine on support cradle.',       tag: 'STANDARD',         tagClass: 'badge-gray'  },
  { title: 'Panel Fastener Removal',      desc: 'Remove 12× M8 hex bolts (torque: 25 Nm). Store in labelled tray.',      tag: null, tagClass: null },
  { title: 'Cover Lift-off & Inspection', desc: 'Lift cover with 2-person assist. Inspect seals and gaskets for wear.',   tag: null, tagClass: null },
];

export default function RecommendationReview({ recommendation, onApprove, onReject }) {
  const [showReasoning, setShowReasoning] = useState(false);

  return (
    <div className="card">
      {/* AI badge */}
      <div className="ai-badge">
        <span style={{ fontSize: '16px' }}>🤖</span>
        AI recommendation generated · Review all steps before deciding
      </div>

      {/* Steps */}
      <div className="card-label">Disassembly Procedure</div>
      {STEPS.map((step, i) => (
        <div key={i} className="step-item">
          <div className="step-num">{i + 1}</div>
          <div className="step-content">
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
            {step.tag && (
              <span className={`badge ${step.tagClass}`} style={{ marginTop: '5px', display: 'inline-flex' }}>
                {step.tagClass === 'badge-red' ? '⚠ ' : ''}{step.tag}
              </span>
            )}
          </div>
        </div>
      ))}

      <div className="section-divider" />

      {/* Sources */}
      <div className="card-label">📎 Source Citations</div>
      {recommendation.sources.map((src, i) => (
        <div key={i} className="citation-card">
          <div className="citation-source">{src.title}</div>
          <div className="citation-detail">Page {src.page}, Section {src.section}</div>
          <span className="citation-link">View Source Document →</span>
        </div>
      ))}

      <div className="section-divider" />

      {/* Reasoning (collapsible) */}
      <div className="flex-between" style={{ marginBottom: '10px' }}>
        <div className="card-label" style={{ marginBottom: 0 }}>Agent Reasoning Path</div>
        <button
          onClick={() => setShowReasoning(!showReasoning)}
          style={{ fontSize: '10px', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'monospace' }}
        >
          {showReasoning ? 'Collapse ↑' : 'Expand ↓'}
        </button>
      </div>

      {showReasoning && (
        <div className="reasoning-box" style={{ marginBottom: '14px' }}>
          {[
            ['📚', 'Data Retrieval Agent', 'Found procedure 5.2 · 3 relevant documents'],
            ['🛡', 'Safety Validation Agent', 'LOTO required · OSHA compliant · Verified'],
            ['📊', 'Priority Adjustment Agent', 'Task classified HIGH · Overdue 2 days'],
          ].map(([icon, name, detail]) => (
            <div key={name} className="reasoning-item">
              <span className="reasoning-icon">{icon}</span>
              <div className="reasoning-text"><strong style={{ color: 'var(--text-primary)' }}>{name}:</strong> {detail}</div>
              <span className="reasoning-check">✓ Verified</span>
            </div>
          ))}
        </div>
      )}

      {/* HITL Buttons */}
      <div className="card-label">⚖ Human-in-the-Loop Decision</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button onClick={onApprove} className="button button-success">
          ✓ &nbsp;Approve &amp; Log
        </button>
        <button className="button button-warning">
          ✏ &nbsp;Request Revision
        </button>
        <button onClick={onReject} className="button button-danger">
          ✕ &nbsp;Override / Reject
        </button>
      </div>

      <div className="audit-notice">
        🔒 This action will be recorded in the audit trail
      </div>
    </div>
  );
}
