import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import BottomTabBar from '../../components/BottomTabBar';
import { api, type AuthUser } from '../../lib/api';

const MENU = [
  { icon: '📋', label: 'My Bookings', path: '/bookings' },
  { icon: '💳', label: 'Payment Methods', path: '/profile/payment' },
  { icon: '🔔', label: 'Notifications', path: '/profile/notifications' },
  { icon: '⚙️', label: 'Settings', path: '/profile/settings' },
  { icon: '❓', label: 'Help & Support', path: '/profile/help' },
  { icon: '📄', label: 'Terms & Privacy', path: '/profile/terms' },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`,
  borderRadius: 10, color: colors.text, fontSize: 14, outline: 'none', boxSizing: 'border-box',
};

export default function ProfileScreen() {
  const [, navigate] = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [editing, setEditing] = useState(false);
  const [isLight, setIsLight] = useState(() => localStorage.getItem('pf-theme') === 'light');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editError, setEditError] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    api.auth.me()
      .then(res => { setUser(res.user); setEditUsername(res.user?.username || ''); })
      .catch(() => navigate('/login'));
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) { setEditError('Only JPG, PNG, and WebP allowed'); return; }
    if (file.size > 5 * 1024 * 1024) { setEditError('Image too large. Max 5MB.'); return; }
    setUploadingAvatar(true);
    try {
      const res = await api.auth.uploadAvatar(file);
      setUser(prev => prev ? { ...prev, imageUrl: res.url } : prev);
    } catch (err) {
      console.error(err);
    } finally { setUploadingAvatar(false); }
  };

  const handleLogout = async () => {
    try { await api.auth.logout(); } catch {}
    navigate('/login');
  };

  const handleSave = async () => {
    setEditError(''); setEditSubmitting(true);
    try {
      const data: { username?: string; password?: string } = {};
      if (editUsername && editUsername !== user?.username) data.username = editUsername;
      if (editPassword) data.password = editPassword;
      if (!data.username && !data.password) { setEditing(false); return; }
      const res = await api.auth.updateProfile(data);
      setUser(res.user);
      setEditing(false);
      setEditPassword('');
    } catch (err: unknown) {
      setEditError(err instanceof Error ? err.message : 'Update failed');
    } finally { setEditSubmitting(false); }
  };

  const initials = user ? user.username.slice(0, 2).toUpperCase() : '??';

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

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: colors.text }}>Profile</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 15, color: colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isLight ? '🌙' : '☀️'}</button>
          <button onClick={() => { setEditUsername(user?.username || ''); setEditPassword(''); setEditError(''); setEditing(!editing); }} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{editing ? 'Cancel' : 'Edit ✏️'}</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ backgroundColor: colors.bgCard, margin: 24, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${colors.border}` }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={user.username} style={{ width: 80, height: 80, borderRadius: 40, objectFit: 'cover', border: `3px solid ${colors.primaryLight}` }} />
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', border: `3px solid ${colors.primaryLight}` }}>{initials}</div>
            )}
            <label style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.bgCard, border: `2px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer' }}>
              📷
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} disabled={uploadingAvatar} />
            </label>
          </div>
          {editing ? (
            <div style={{ textAlign: 'left' }}>
              {editError && <div style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 10, padding: 10, marginBottom: 12, color: colors.error, fontSize: 12 }}>{editError}</div>}
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>Username</div>
              <input style={{ ...inputStyle, marginBottom: 12 }} value={editUsername} onChange={e => setEditUsername(e.target.value)} />
              <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 600, marginBottom: 4 }}>New Password (leave blank to keep)</div>
              <input type="password" style={inputStyle} value={editPassword} onChange={e => setEditPassword(e.target.value)} placeholder="••••••••" />
              <button onClick={handleSave} disabled={editSubmitting} style={{ width: '100%', marginTop: 16, padding: '12px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', opacity: editSubmitting ? 0.7 : 1 }}>{editSubmitting ? 'Saving...' : 'Save Changes'}</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, marginBottom: 4 }}>{user?.username || 'Loading...'}</div>
              {user?.role === 'admin' && <div style={{ fontSize: 11, fontWeight: 700, color: colors.primary, backgroundColor: `${colors.primary}22`, padding: '2px 10px', borderRadius: 999, display: 'inline-block', marginBottom: 24 }}>Admin</div>}
              {user?.role !== 'admin' && <div style={{ height: 24 }} />}
            </>
          )}
        </div>

        <div style={{ backgroundColor: colors.bgCard, margin: '0 24px', borderRadius: 16, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 24 }}>
          {MENU.map((item, i) => (
            <div key={item.label} onClick={() => item.path && navigate(item.path)} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: i < MENU.length - 1 ? `1px solid ${colors.border}` : 'none', cursor: item.path ? 'pointer' : 'default' }}>
              <span style={{ fontSize: 18, width: 28 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: colors.text, fontWeight: 500 }}>{item.label}</span>
              <span style={{ color: colors.textDim, fontSize: 20 }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ margin: '0 24px 24px' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '14px 0', backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, color: colors.error, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>🚪  Sign Out</button>
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
