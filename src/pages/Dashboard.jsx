import { useState } from 'react';
import QueryInput from '../components/dashboard/QueryInput';
import AgentStatus from '../components/agents/AgentStatus';
import RecommendationReview from '../components/dashboard/RecommendationReview';

export default function Dashboard() {
  const [isProcessing, setIsProcessing]   = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [query, setQuery] = useState('');

  const handleSubmitQuery = async (queryText) => {
    setQuery(queryText);
    setRecommendation(null);
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 4000));
    setRecommendation({
      text: "Step-by-step disassembly procedure generated.",
      sources: [
        { title: 'FedEx Manual X-1000', page: 42, section: '5.2' },
        { title: 'OSHA 29 CFR 1910.147', page: 12, section: '3.1' },
      ],
      reasoning: 'Retrieved from engine manual; safety validation passed.',
    });
    setIsProcessing(false);
  };

  const handleApprove = () => {
    alert('✓ Recommendation approved and logged to audit trail.');
    setRecommendation(null);
  };

  const handleReject = () => {
    alert('✕ Recommendation rejected and logged to audit trail.');
    setRecommendation(null);
  };

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div className="page-title">Maintenance Copilot</div>
        <div className="page-subtitle">Submit a disassembly query to activate the multi-agent pipeline</div>
      </div>

      {/* Active task badge */}
      {(isProcessing || recommendation) && query && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: '8px', padding: '10px 14px', marginBottom: '14px',
          fontSize: '12px', color: 'var(--text-secondary)'
        }}>
          <span style={{ fontSize: '14px' }}>📋</span>
          <span><strong style={{ color: 'var(--text-primary)' }}>Active task:</strong> {query.slice(0, 80)}{query.length > 80 ? '…' : ''}</span>
          <span className="badge badge-red" style={{ marginLeft: 'auto' }}>HIGH</span>
        </div>
      )}

      <QueryInput onSubmit={handleSubmitQuery} disabled={isProcessing} />

      {isProcessing && <AgentStatus />}

      {recommendation && (
        <RecommendationReview
          recommendation={recommendation}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {/* Empty state */}
      {!isProcessing && !recommendation && (
        <div style={{
          textAlign: 'center', padding: '40px 20px',
          color: 'var(--text-muted)', fontSize: '12px',
          border: '1px dashed var(--border)', borderRadius: '10px'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
          <div style={{ fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '4px' }}>No active task</div>
          <div>Describe a maintenance task above to activate the AI pipeline</div>
        </div>
      )}
    </div>
  );
}
