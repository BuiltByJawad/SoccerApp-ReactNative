import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const S: Record<string, React.CSSProperties> = {
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

export default function LoginScreen() {
  const [, navigate] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={S.container}>
      <div style={S.logo}>⚽ PlayField</div>
      <div style={S.title}>Welcome Back</div>
      <div style={S.subtitle}>Sign in to book your next session</div>

      <div style={{ marginBottom: 16 }}>
        <div style={S.label}>Phone Number</div>
        <div style={S.inputWrap}>
          <span style={S.prefix}>🇧🇩 +880</span>
          <input style={S.prefixInput} placeholder="1XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>

      <div style={{ marginBottom: 8 }}>
        <div style={S.label}>Password</div>
        <input type="password" style={S.input} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <div style={S.forgot}>Forgot password?</div>

      <div style={{ marginBottom: 16 }}>
        <div style={S.label}>Login as</div>
        <div style={S.row}>
          <button style={!isAdmin ? S.tabActive : S.tabInactive} onClick={() => setIsAdmin(false)}>Player</button>
          <button style={isAdmin ? S.tabActive : S.tabInactive} onClick={() => setIsAdmin(true)}>Admin</button>
        </div>
      </div>

      <button style={S.primaryBtn} onClick={() => navigate(isAdmin ? '/admin' : '/home')}>Sign In</button>

      <div style={S.dividerWrap}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>or</span>
        <div style={S.dividerLine} />
      </div>

      <button style={S.googleBtn}>🌐  Continue with Google</button>

      <div style={S.link}>
        Don't have an account?{' '}
        <span style={S.linkHL} onClick={() => navigate('/register')}>Sign Up</span>
      </div>
    </div>
  );
}
