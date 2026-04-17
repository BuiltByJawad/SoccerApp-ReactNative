import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const input: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: '#1A2535',
  border: `1px solid ${colors.border}`, borderRadius: 12, color: colors.text,
  fontSize: 15, outline: 'none', boxSizing: 'border-box', marginBottom: 16,
};

export default function RegisterScreen() {
  const [, navigate] = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div style={{ flex: 1, backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', padding: '60px 24px 40px' }}>
      <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 24, padding: 0 }}>← Back</button>
      <div style={{ fontSize: 28, fontWeight: 800, color: colors.text, marginBottom: 8 }}>Create Account</div>
      <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 32 }}>Join thousands of players booking sessions daily</div>

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Full Name</div>
      <input style={input} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Email Address</div>
      <input type="email" style={input} placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Password</div>
      <input type="password" style={input} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />

      <div style={{ fontSize: 13, color: colors.textMuted, fontWeight: 600, marginBottom: 6 }}>Phone Number</div>
      <div style={{ display: 'flex', backgroundColor: '#1A2535', border: `1px solid ${colors.border}`, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
        <span style={{ padding: '14px 16px', color: colors.textMuted, fontSize: 13, borderRight: `1px solid ${colors.border}` }}>🇧🇩 +880</span>
        <input style={{ flex: 1, padding: '14px 16px', backgroundColor: 'transparent', border: 'none', color: colors.text, fontSize: 15, outline: 'none' }} placeholder="1XXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>

      <p style={{ fontSize: 12, color: colors.textDim, lineHeight: '18px', marginBottom: 16 }}>
        By creating an account you agree to our{' '}
        <span style={{ color: colors.primary }}>Terms of Service</span> and{' '}
        <span style={{ color: colors.primary }}>Privacy Policy</span>.
      </p>

      <button onClick={() => navigate('/home')} style={{ width: '100%', padding: '16px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
        Create Account
      </button>

      <div style={{ textAlign: 'center', marginTop: 32, fontSize: 14, color: colors.textMuted }}>
        Already have an account?{' '}
        <span onClick={() => navigate('/login')} style={{ color: colors.primary, fontWeight: 700, cursor: 'pointer' }}>Sign In</span>
      </div>
    </div>
  );
}
