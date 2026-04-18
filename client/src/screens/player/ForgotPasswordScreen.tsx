import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api } from '../../lib/api';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`,
  borderRadius: 12, color: colors.text, fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 16,
};

export default function ForgotPasswordScreen() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRequest = async () => {
    if (!username) { setError('Enter your username'); return; }
    setError(''); setSubmitting(true);
    try {
      const res = await api.auth.forgotPassword(username);
      setSuccess(res.hint || res.message);
      setStep('reset');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally { setSubmitting(false); }
  };

  const handleReset = async () => {
    if (!token || !password) { setError('Fill in all fields'); return; }
    setError(''); setSubmitting(true);
    try {
      await api.auth.resetPassword(username, token, password);
      setSuccess('Password reset! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    } finally { setSubmitting(false); }
  };

  return (
    <div style={{ flex: 1, backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', padding: '60px 24px 40px' }}>
      <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: 0 }}>← Back</button>
      <div style={{ fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>Reset Password</div>
      <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>Enter your username to get a reset token</div>

      {error && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 12, padding: 12, marginBottom: 16, color: colors.error, fontSize: 13 }}>{error}</div>}
      {success && <div style={{ backgroundColor: `${colors.primary}22`, border: `1px solid ${colors.primary}44`, borderRadius: 12, padding: 12, marginBottom: 16, color: colors.primary, fontSize: 13 }}>{success}</div>}

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Username</div>
      <input style={inputStyle} placeholder="Your username" value={username} onChange={e => setUsername(e.target.value)} disabled={step === 'reset'} />

      {step === 'reset' && (
        <>
          <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Reset Token</div>
          <input style={inputStyle} placeholder="Enter the token you received" value={token} onChange={e => setToken(e.target.value)} />

          <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>New Password</div>
          <input type="password" style={inputStyle} placeholder="Choose a new password" value={password} onChange={e => setPassword(e.target.value)} />
        </>
      )}

      <button onClick={step === 'request' ? handleRequest : handleReset} disabled={submitting} style={{ width: '100%', padding: '16px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Please wait...' : step === 'request' ? 'Get Reset Token' : 'Reset Password'}
      </button>
    </div>
  );
}
