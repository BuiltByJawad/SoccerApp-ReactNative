import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type AuthUser } from '../../lib/api';

export default function AdminSettingsScreen() {
  const [, navigate] = useLocation();
  const [isLight, setIsLight] = useState(() => localStorage.getItem('pf-theme') === 'light');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [changingPw, setChangingPw] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSubmitting, setPwSubmitting] = useState(false);

  useEffect(() => {
    api.auth.me().then(res => setUser(res.user)).catch(() => navigate('/login'));
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('pf-light');
      localStorage.setItem('pf-theme', 'light');
    } else {
      document.documentElement.classList.remove('pf-light');
      localStorage.setItem('pf-theme', 'dark');
    }
  };

  const handleLogout = async () => {
    try { await api.auth.logout(); } catch {}
    navigate('/login');
  };

  const handleSavePw = async () => {
    if (!newPw || newPw.length < 6) { setPwError('Password must be at least 6 characters'); return; }
    setPwSubmitting(true); setPwError('');
    try {
      const res = await api.auth.updateProfile({ password: newPw });
      setUser(res.user);
      setChangingPw(false); setNewPw('');
    } catch (err: unknown) {
      setPwError(err instanceof Error ? err.message : 'Failed');
    } finally { setPwSubmitting(false); }
  };

  const cancelPw = () => { setChangingPw(false); setNewPw(''); setPwError(''); };

  const section: React.CSSProperties = {
    backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}`, marginBottom: 16,
  };

  const row: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0',
    borderBottom: `1px solid ${colors.border}`,
  };

  const lastRow: React.CSSProperties = { ...row, borderBottom: 'none' };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Settings</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={section}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Appearance</div>
          <div style={row}>
            <div style={{ fontSize: 14, color: colors.text, fontWeight: 600 }}>Theme</div>
            <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 16, color: colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLight ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        <div style={section}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Account</div>
          <div style={row}>
            <div>
              <div style={{ fontSize: 14, color: colors.text, fontWeight: 600 }}>Username</div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>{user?.username || 'Loading...'}</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: colors.primary, backgroundColor: `${colors.primary}22`, padding: '2px 10px', borderRadius: 999 }}>Admin</span>
          </div>
          {changingPw ? (
            <div style={{ marginTop: 12 }}>
              {pwError && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 10, padding: 10, marginBottom: 10, color: colors.error, fontSize: 12 }}>{pwError}</div>}
              <input type="password" placeholder="New password (min 6 chars)" value={newPw} onChange={e => setNewPw(e.target.value)} style={{ width: '100%', padding: '10px 14px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 10 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleSavePw} disabled={pwSubmitting} style={{ flex: 1, padding: '10px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: pwSubmitting ? 0.7 : 1 }}>{pwSubmitting ? 'Saving...' : 'Save'}</button>
                <button onClick={cancelPw} style={{ flex: 1, padding: '10px 0', backgroundColor: 'transparent', border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.textMuted, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={lastRow}>
              <div>
                <div style={{ fontSize: 14, color: colors.text, fontWeight: 600 }}>Change Password</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>Update your admin password</div>
              </div>
              <button onClick={() => setChangingPw(true)} style={{ padding: '6px 16px', borderRadius: 999, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, color: colors.textMuted, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Change</button>
            </div>
          )}
        </div>

        <div style={section}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>About</div>
          <div style={row}>
            <div style={{ fontSize: 14, color: colors.text, fontWeight: 600 }}>App Version</div>
            <span style={{ fontSize: 12, color: colors.textMuted }}>1.0.0</span>
          </div>
          <div style={lastRow}>
            <div style={{ fontSize: 14, color: colors.text, fontWeight: 600 }}>Platform</div>
            <span style={{ fontSize: 12, color: colors.textMuted }}>Web (PWA)</span>
          </div>
        </div>

        <button onClick={handleLogout} style={{ width: '100%', padding: '14px 0', backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, color: colors.error, fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 20 }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
