import React from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import BottomTabBar from '../../components/BottomTabBar';

const MENU = [
  { icon: '📋', label: 'My Bookings', path: '/bookings', badge: '2' },
  { icon: '💳', label: 'Payment Methods', path: null },
  { icon: '🔔', label: 'Notifications', path: null },
  { icon: '⚙️', label: 'Settings', path: null },
  { icon: '❓', label: 'Help & Support', path: null },
  { icon: '📄', label: 'Terms & Privacy', path: null },
];

export default function ProfileScreen() {
  const [, navigate] = useLocation();

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: colors.text }}>Profile</div>
        <button style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Edit ✏️</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
        <div style={{ backgroundColor: colors.bgCard, margin: 24, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${colors.border}` }}>
          <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
            <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', border: `3px solid ${colors.primaryLight}` }}>JD</div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: colors.bgCard, border: `2px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⚽</div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: colors.text, marginBottom: 4 }}>John Doe</div>
          <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 2 }}>+880 1712 345 678</div>
          <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 24 }}>john@example.com</div>
          <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 16, display: 'flex' }}>
            {[{ label: 'Sessions', value: '12' }, { label: 'Venues', value: '4' }, { label: 'Hours', value: '18h' }].map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>{s.value}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: colors.bgCard, margin: '0 24px', borderRadius: 16, padding: 16, border: `1px solid ${colors.border}`, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>🏆</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Gold Player</div>
              <div style={{ fontSize: 11, color: colors.textMuted }}>480 / 500 XP to Platinum</div>
            </div>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: colors.primary }}>96%</span>
        </div>
        <div style={{ height: 6, backgroundColor: colors.border, margin: '0 24px 24px', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '96%', backgroundColor: colors.primary, borderRadius: 3 }} />
        </div>

        <div style={{ backgroundColor: colors.bgCard, margin: '0 24px', borderRadius: 16, border: `1px solid ${colors.border}`, overflow: 'hidden', marginBottom: 24 }}>
          {MENU.map((item, i) => (
            <div key={item.label} onClick={() => item.path && navigate(item.path)} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: i < MENU.length - 1 ? `1px solid ${colors.border}` : 'none', cursor: item.path ? 'pointer' : 'default' }}>
              <span style={{ fontSize: 18, width: 28 }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 14, color: colors.text, fontWeight: 500 }}>{item.label}</span>
              {item.badge && <div style={{ backgroundColor: colors.primary, borderRadius: 999, width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 8 }}><span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{item.badge}</span></div>}
              <span style={{ color: colors.textDim, fontSize: 20 }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ margin: '0 24px 24px' }}>
          <button onClick={() => navigate('/login')} style={{ width: '100%', padding: '14px 0', backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, color: colors.error, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>🚪  Sign Out</button>
        </div>
      </div>

      <BottomTabBar />
    </div>
  );
}
