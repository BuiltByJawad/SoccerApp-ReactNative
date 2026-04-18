import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api } from '../../lib/api';

const input: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: colors.inputBg,
  border: `1px solid ${colors.border}`, borderRadius: 12, color: colors.text,
  fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 16,
};

export default function RegisterScreen() {
  const [, navigate] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) { setError('Please fill in all fields'); return; }
    setError('');
    setSubmitting(true);
    try {
      await api.auth.register(username, password);
      navigate('/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ flex: 1, backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', padding: '60px 24px 40px' }}>
      <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: 0 }}>← Back</button>
      <div style={{ fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>Create Account</div>
      <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>Join thousands of players booking sessions daily</div>

      {error && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 12, padding: 12, marginBottom: 16, color: colors.error, fontSize: 13 }}>{error}</div>}

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Username</div>
      <input style={input} placeholder="Choose a username" value={username} onChange={e => setUsername(e.target.value)} />

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Password</div>
      <input type="password" style={input} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister} disabled={submitting} style={{ width: '100%', padding: '16px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Creating...' : 'Create Account'}
      </button>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: colors.textMuted }}>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ color: colors.primary, fontWeight: 700, cursor: 'pointer' }}>Sign In</span>
      </div>
    </div>
  );
}
