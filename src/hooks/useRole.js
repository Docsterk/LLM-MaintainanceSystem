// src/hooks/useRole.js
export function useRole() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'beginner';

  return {
    role,
    isAdmin:        role === 'admin',
    isExpert:       role === 'expert',
    isIntermediate: role === 'intermediate',
    isBeginner:     role === 'beginner',
    canApprove:     ['admin', 'expert', 'intermediate'].includes(role),
    canSeeReasoning:['admin', 'expert'].includes(role),
    canSeeAgents:   ['admin', 'expert'].includes(role),
    needsGuidance:  ['beginner', 'intermediate'].includes(role),
    isJunior:       role === 'beginner',
  };
}