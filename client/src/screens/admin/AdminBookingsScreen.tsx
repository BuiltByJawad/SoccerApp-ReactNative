import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Booking } from '../../lib/api';

const STATUS_COLORS: Record<string, string> = { confirmed: colors.primary, pending: colors.warning, cancelled: colors.error };
const FILTERS = ['All', 'Confirmed', 'Pending', 'Cancelled'];

export default function AdminBookingsScreen() {
  const [, navigate] = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.bookings.list()
      .then(res => setBookings(res.bookings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => {
    const matchFilter = activeFilter === 'All' || b.status === activeFilter.toLowerCase();
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.type.toLowerCase().includes(search.toLowerCase()) || b.venueId.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const updateStatus = async (id: string, status: "pending" | "confirmed" | "cancelled") => {
    try {
      const res = await api.admin.bookings.updateStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? res.booking : b));
    } catch (err) {
      console.error(err);
    }
  };
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
          {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>Loading...</div> : filtered.length === 0 ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>No bookings found</div> : filtered.map(booking => (
            <div key={booking.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: `${colors.primary}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: colors.primary, fontSize: 14 }}>{booking.userId.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>User {booking.userId.slice(0, 8)}</div>
                    <div style={{ fontSize: 11, color: colors.textDim }}>#{booking.id}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: `${STATUS_COLORS[booking.status]}22`, border: `1px solid ${STATUS_COLORS[booking.status]}55`, borderRadius: 999, padding: '4px 12px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLORS[booking.status] }}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                </div>
              </div>

              <div style={{ height: 1, backgroundColor: colors.border, marginBottom: 12 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                {[{ icon: '🏟️', value: `Venue ${booking.venueId.slice(0, 8)}` }, { icon: '📅', value: `${booking.dateLabel} · ${booking.timeLabel}` }, { icon: '⚽', value: `${booking.type} format` }, { icon: booking.split ? '🤝' : '💳', value: booking.split ? `Split (${booking.teammates + 1} players)` : 'Full payment' }].map((d, i) => (
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
