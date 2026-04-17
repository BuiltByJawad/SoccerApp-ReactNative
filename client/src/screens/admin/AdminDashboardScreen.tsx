import React from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const RECENT_BOOKINGS = [
  { id: 'BK001', player: 'John Doe', venue: 'DBox Sports', time: '9:00 AM', status: 'confirmed', amount: 275 },
  { id: 'BK002', player: 'Rahim Ahmed', venue: 'Premier Arena', time: '6:00 PM', status: 'pending', amount: 350 },
  { id: 'BK003', player: 'Sarah Khan', venue: 'Green Field', time: '7:00 AM', status: 'confirmed', amount: 500 },
  { id: 'BK004', player: 'Ali Hassan', venue: 'City Sports', time: '8:00 PM', status: 'cancelled', amount: 200 },
];

const STATUS_COLORS: Record<string, string> = { confirmed: colors.primary, pending: colors.warning, cancelled: colors.error };

export default function AdminDashboardScreen() {
  const [, navigate] = useLocation();

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Admin Dashboard</div>
          <div style={{ fontSize: 13, color: colors.textMuted }}>Sunday, 05 July 2025</div>
        </div>
        <button onClick={() => navigate('/login')} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, cursor: 'pointer', fontSize: 18, color: colors.error }}>⏻</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Total Bookings', value: '247', icon: '📋', delta: '+12%' }, { label: 'Revenue Today', value: 'BDT 8.4K', icon: '💰', delta: '+8%' }, { label: 'Active Sessions', value: '6', icon: '🟢', delta: 'Live' }, { label: 'Venues', value: '4', icon: '🏟️', delta: 'All Active' }].map(stat => (
            <div key={stat.label} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary, marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: colors.primaryLight, fontWeight: 600 }}>{stat.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}`, marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Revenue This Week</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 100, gap: 6, marginBottom: 8 }}>
            {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: h, backgroundColor: colors.primary, borderRadius: 4, opacity: 0.8 }} />
                <span style={{ fontSize: 10, color: colors.textMuted }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Total: BDT 42,600</span>
            <span style={{ fontSize: 12, color: colors.textMuted }}>Avg/day: BDT 6,085</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>Recent Bookings</div>
          <span onClick={() => navigate('/admin/bookings')} style={{ color: colors.primary, fontSize: 13, cursor: 'pointer' }}>See All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {RECENT_BOOKINGS.map(b => (
            <div key={b.id} style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: colors.primary, fontSize: 14 }}>{b.player.split(' ').map(n => n[0]).join('')}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{b.player}</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{b.venue} · {b.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.primary, marginBottom: 4 }}>BDT {b.amount}</div>
                <div style={{ backgroundColor: `${STATUS_COLORS[b.status]}22`, borderRadius: 999, padding: '2px 8px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: STATUS_COLORS[b.status] }}>{b.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[{ icon: '🏟️', label: 'Manage Venues', path: '/admin/venues' }, { icon: '📋', label: 'Manage Bookings', path: '/admin/bookings' }, { icon: '📊', label: 'Reports', path: null }, { icon: '⚙️', label: 'Settings', path: null }].map(action => (
            <div key={action.label} onClick={() => action.path && navigate(action.path)} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, textAlign: 'center', border: `1px solid ${colors.border}`, cursor: action.path ? 'pointer' : 'default' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{action.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{action.label}</div>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
