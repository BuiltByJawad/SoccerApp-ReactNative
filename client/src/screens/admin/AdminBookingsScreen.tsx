import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const BOOKINGS = [
  { id: 'BK001', player: 'John Doe', venue: 'DBox Sports Complex', type: '5v5', date: 'Sun, 05 Jul', time: '9:00 AM', amount: 275, status: 'confirmed', split: true, teammates: 3 },
  { id: 'BK002', player: 'Rahim Ahmed', venue: 'Premier Arena', type: '7v7', date: 'Sun, 05 Jul', time: '6:00 PM', amount: 350, status: 'pending', split: false, teammates: 0 },
  { id: 'BK003', player: 'Sarah Khan', venue: 'Green Field Club', type: '11v11', date: 'Sat, 28 Jun', time: '7:00 AM', amount: 500, status: 'confirmed', split: true, teammates: 4 },
  { id: 'BK004', player: 'Ali Hassan', venue: 'City Sports Hub', type: '5v5', date: 'Fri, 27 Jun', time: '8:00 PM', amount: 200, status: 'cancelled', split: false, teammates: 0 },
  { id: 'BK005', player: 'Maria Begum', venue: 'DBox Sports Complex', type: '5v5', date: 'Thu, 26 Jun', time: '10:00 AM', amount: 275, status: 'confirmed', split: true, teammates: 2 },
];

const STATUS_COLORS: Record<string, string> = { confirmed: colors.primary, pending: colors.warning, cancelled: colors.error };
const FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled'];

export default function AdminBookingsScreen() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState(BOOKINGS);

  const filtered = bookings.filter(b => {
    const matchFilter = activeFilter === 'All' || b.status === activeFilter.toLowerCase();
    const matchSearch = b.player.toLowerCase().includes(search.toLowerCase()) || b.venue.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = (id: string, status: string) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  const totalRevenue = filtered.reduce((s, b) => s + (b.status !== 'cancelled' ? b.amount : 0), 0);

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Manage Bookings</span>
        <div style={{ width: 60 }} />
      </div>

      <div style={{ padding: '12px 24px', backgroundColor: colors.bgCard, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: colors.inputBg, borderRadius: 999, padding: '0 16px', border: `1px solid ${colors.border}`, marginBottom: 12 }}>
          <span style={{ marginRight: 8 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings, players..." style={{ flex: 1, background: 'none', border: 'none', color: colors.text, fontSize: 14, padding: '10px 0', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {FILTERS.map(tab => <button key={tab} onClick={() => setActiveFilter(tab)} style={{ flex: 1, padding: '7px 0', borderRadius: 999, backgroundColor: activeFilter === tab ? colors.primary : colors.bgCard, border: `1px solid ${activeFilter === tab ? colors.primary : colors.border}`, color: activeFilter === tab ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>{tab}</button>)}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 24px', borderBottom: `1px solid ${colors.border}` }}>
        <span style={{ fontSize: 12, color: colors.textMuted }}>{filtered.length} bookings</span>
        <span style={{ fontSize: 13, color: colors.primary, fontWeight: 700 }}>Revenue: BDT {totalRevenue.toLocaleString()}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(booking => (
            <div key={booking.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: colors.primary, fontSize: 14 }}>{booking.player.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{booking.player}</div>
                    <div style={{ fontSize: 11, color: colors.textDim }}>#{booking.id}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: `${STATUS_COLORS[booking.status]}22`, border: `1px solid ${STATUS_COLORS[booking.status]}55`, borderRadius: 999, padding: '4px 12px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLORS[booking.status] }}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                </div>
              </div>

              <div style={{ height: 1, backgroundColor: colors.border, marginBottom: 12 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {[{ icon: '🏟️', value: booking.venue }, { icon: '📅', value: `${booking.date} · ${booking.time}` }, { icon: '⚽', value: `${booking.type} format` }, { icon: booking.split ? '🤝' : '💳', value: booking.split ? `Split (${booking.teammates + 1} players)` : 'Full payment' }].map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, width: 20 }}>{d.icon}</span>
                    <span style={{ fontSize: 12, color: colors.textMuted }}>{d.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: colors.primary }}>BDT {booking.amount}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  {booking.status === 'pending' && (
                    <>
                      <button onClick={() => updateStatus(booking.id, 'confirmed')} style={{ backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '6px 14px', color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✓ Confirm</button>
                      <button onClick={() => updateStatus(booking.id, 'cancelled')} style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, padding: '6px 14px', color: colors.error, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>✕ Reject</button>
                    </>
                  )}
                  {booking.status === 'confirmed' && <button onClick={() => updateStatus(booking.id, 'cancelled')} style={{ border: `1px solid ${colors.error}44`, borderRadius: 999, padding: '6px 14px', color: colors.error, fontSize: 12, background: 'none', cursor: 'pointer' }}>Cancel</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
