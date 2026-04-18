import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api } from '../../lib/api';

function getStyles(): Record<string, React.CSSProperties> {
  return {
    container: { flex: 1, backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', padding: '80px 24px 40px' },
    logo: { fontSize: 18, fontWeight: 700, color: colors.primary, marginBottom: 24 },
    title: { fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 },
    subtitle: { fontSize: 14, color: colors.textMuted, marginBottom: 32 },
    label: { fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 },
    input: { width: '100%', padding: '14px 16px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 12, color: colors.text, fontSize: 15, outline: 'none', boxSizing: 'border-box' },
    row: { display: 'flex', gap: 8, backgroundColor: colors.bgCard, borderRadius: 12, padding: 4, marginBottom: 16 },
    tabActive: { flex: 1, padding: '8px 0', borderRadius: 8, backgroundColor: colors.primary, textAlign: 'center', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', border: 'none' },
    tabInactive: { flex: 1, padding: '8px 0', borderRadius: 8, backgroundColor: 'transparent', textAlign: 'center', color: colors.textMuted, fontWeight: 600, fontSize: 14, cursor: 'pointer', border: 'none' },
    primaryBtn: { width: '100%', padding: '16px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 8 },
    dividerWrap: { display: 'flex', alignItems: 'center', gap: 12, margin: '16px 0' },
    dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
    dividerText: { color: colors.textDim, fontSize: 12 },
    googleBtn: { width: '100%', padding: '16px 0', backgroundColor: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.text, fontWeight: 600, fontSize: 14, cursor: 'pointer' },
    link: { textAlign: 'center' as const, marginTop: 32, fontSize: 14, color: colors.textMuted },
    linkHL: { color: colors.primary, fontWeight: 700, cursor: 'pointer' },
    forgot: { textAlign: 'right' as const, fontSize: 13, color: colors.primary, cursor: 'pointer', marginBottom: 16 },
    inputWrap: { display: 'flex', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 },
    prefix: { padding: '14px 16px', color: colors.textMuted, fontSize: 13, borderRight: `1px solid ${colors.border}` },
    prefixInput: { flex: 1, padding: '14px 16px', backgroundColor: 'transparent', border: 'none', color: colors.text, fontSize: 15, outline: 'none' },
  };
}

export default function LoginScreen() {
  const [, navigate] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isLight, setIsLight] = useState(() => localStorage.getItem('pf-theme') === 'light');

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) { document.documentElement.classList.add('pf-light'); localStorage.setItem('pf-theme', 'light'); }
    else { document.documentElement.classList.remove('pf-light'); localStorage.setItem('pf-theme', 'dark'); }
  };

  const S = getStyles();

  const handleLogin = async () => {
    if (!username || !password) { setError('Please fill in all fields'); return; }
    setError('');
    setSubmitting(true);
    try {
      const user = await api.auth.login(username, password);
      navigate(user.role === 'admin' ? '/admin' : '/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={S.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={S.logo}>⚽ PlayField</div>
        <button onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 15, color: colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isLight ? '🌙' : '☀️'}</button>
      </div>
      <div style={S.title}>Welcome Back</div>
      <div style={S.subtitle}>Sign in to book your next session</div>

      {error && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 12, padding: 12, marginBottom: 16, color: colors.error, fontSize: 13 }}>{error}</div>}

      <div style={{ marginBottom: 16 }}>
        <div style={S.label}>Username</div>
        <input style={S.input} placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={S.label}>Password</div>
        <input type="password" style={S.input} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div style={S.forgot} onClick={() => navigate('/forgot-password')}>Forgot password?</div>

      <div style={{ marginBottom: 16 }}>
        <div style={S.label}>Login as</div>
        <div style={S.row}>
          <button style={!isAdmin ? S.tabActive : S.tabInactive} onClick={() => setIsAdmin(false)}>Player</button>
          <button style={isAdmin ? S.tabActive : S.tabInactive} onClick={() => setIsAdmin(true)}>Admin</button>
        </div>
      </div>

      <button style={{ ...S.primaryBtn, opacity: submitting ? 0.7 : 1 }} onClick={handleLogin} disabled={submitting}>{submitting ? 'Signing in...' : 'Sign In'}</button>

      <div style={S.link}>
        Don't have an account?{' '}
        <span style={S.linkHL} onClick={() => navigate('/register')}>Sign Up</span>
      </div>
    </div>
  );
}
