import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Booking, type Venue } from '../../lib/api';

const STATUS_COLORS: Record<string, string> = { confirmed: colors.primary, pending: colors.warning, cancelled: colors.error };

export default function AdminDashboardScreen() {
  const [, navigate] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLight, setIsLight] = useState(() => localStorage.getItem('pf-theme') === 'light');

  useEffect(() => {
    Promise.all([api.admin.bookings.list(), api.admin.venues.list()])
      .then(([b, v]) => {
        setBookings(b.bookings);
        setVenues(v.venues);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try { await api.auth.logout(); } catch {}
    navigate('/login');
  };

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

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const revenueTotal = confirmedBookings.reduce((s, b) => s + b.amount, 0);
  const activeVenues = venues.filter(v => v.active).length;
  const recentBookings = bookings.slice(0, 4);

  const today = new Date();
  const dayOfWeek = (today.getDay() + 6) % 7;
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);
  weekStart.setHours(0, 0, 0, 0);

  const dailyRevenue = Array(7).fill(0);
  confirmedBookings.forEach(b => {
    const created = new Date(b.createdAt);
    const diff = Math.floor((created.getTime() - weekStart.getTime()) / 86400000);
    if (diff >= 0 && diff < 7) dailyRevenue[diff] += b.amount;
  });
  const weekTotal = dailyRevenue.reduce((a, b) => a + b, 0);
  const maxDaily = Math.max(...dailyRevenue, 1);

  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: colors.text }}>Admin Dashboard</div>
          <div style={{ fontSize: 13, color: colors.textMuted }}>{dateStr}</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 16, color: colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isLight ? '🌙' : '☀️'}</button>
          <button onClick={handleLogout} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, cursor: 'pointer', fontSize: 16, color: colors.error, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏻</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Total Bookings', value: String(totalBookings), icon: '📋', delta: `${confirmedBookings.length} confirmed` }, { label: 'Revenue', value: `BDT ${revenueTotal.toLocaleString()}`, icon: '💰', delta: `${bookings.filter(b => b.status === 'pending').length} pending` }, { label: 'Active Venues', value: String(activeVenues), icon: '🏟️', delta: `${venues.length} total` }, { label: 'Cancelled', value: String(bookings.filter(b => b.status === 'cancelled').length), icon: '❌', delta: 'This period' }].map(stat => (
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
            {dailyRevenue.map((amt, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: maxDaily > 0 ? Math.max(4, (amt / maxDaily) * 90) : 4, backgroundColor: i === dayOfWeek ? colors.primary : `${colors.primary}88`, borderRadius: 4 }} />
                <span style={{ fontSize: 10, color: i === dayOfWeek ? colors.primary : colors.textMuted, fontWeight: i === dayOfWeek ? 700 : 400 }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>Total: BDT {weekTotal.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: colors.textMuted }}>Avg/day: BDT {weekTotal > 0 ? Math.round(weekTotal / 7).toLocaleString() : 0}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>Recent Bookings</div>
          <span onClick={() => navigate('/admin/bookings')} style={{ color: colors.primary, fontSize: 13, cursor: 'pointer' }}>See All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>Loading...</div> : recentBookings.length === 0 ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>No bookings yet</div> : recentBookings.map(b => (
            <div key={b.id} style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${colors.border}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: colors.primary, fontSize: 14 }}>{b.userId.slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{b.type} · {b.venueId.slice(0, 8)}</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{b.dateLabel} · {b.timeLabel}</div>
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
          {[{ icon: '🏟️', label: 'Manage Venues', path: '/admin/venues' }, { icon: '📋', label: 'Manage Bookings', path: '/admin/bookings' }, { icon: '📊', label: 'Reports', path: '/admin/reports' }, { icon: '⚙️', label: 'Settings', path: '/admin/settings' }].map(action => (
            <div key={action.label} onClick={() => action.path && navigate(action.path)} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, textAlign: 'center', border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
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
