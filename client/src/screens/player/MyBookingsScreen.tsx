import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import BottomTabBar from '../../components/BottomTabBar';
import { api, type Booking } from '../../lib/api';

const STATUS_COLORS: Record<string, string> = { pending: colors.warning, confirmed: colors.primary, cancelled: colors.error };
const TABS = ['All', 'Pending', 'Confirmed', 'Cancelled'];

export default function MyBookingsScreen() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState('All');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

  useEffect(() => {
    api.bookings.list()
      .then(res => setBookings(res.bookings))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => activeTab === 'All' || b.status === activeTab.toLowerCase());

  const handleCancel = async (id: string) => {
    setCancelling(id);
    try {
      const res = await api.bookings.cancel(id);
      setBookings(prev => prev.map(b => b.id === id ? res.booking : b));
    } catch (err) {
      console.error(err);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: colors.text }}>My Bookings</div>
      </div>

      <div style={{ display: 'flex', gap: 6, padding: '12px 24px', backgroundColor: colors.bgCard, borderBottom: `1px solid ${colors.border}` }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '6px 0', borderRadius: 999, backgroundColor: activeTab === tab ? colors.primary : 'transparent', border: `1px solid ${activeTab === tab ? colors.primary : colors.border}`, color: activeTab === tab ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>{tab}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 90 }}>
        {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 40 }}>Loading...</div> : filtered.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 8 }}>No bookings found</div>
            <div style={{ fontSize: 14, color: colors.textMuted }}>Your {activeTab.toLowerCase()} bookings will appear here.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map(booking => (
              <div key={booking.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🏟️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{booking.type} · Venue</div>
                    <div style={{ fontSize: 12, color: colors.textMuted }}>{booking.type}</div>
                  </div>
                  <div style={{ backgroundColor: `${STATUS_COLORS[booking.status]}22`, border: `1px solid ${STATUS_COLORS[booking.status]}44`, borderRadius: 999, padding: '3px 10px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLORS[booking.status] }}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                  </div>
                </div>

                <div style={{ height: 1, backgroundColor: colors.border, marginBottom: 12 }} />

                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                  {[{ icon: '📅', text: booking.dateLabel }, { icon: '🕐', text: booking.timeLabel }, { icon: '🤝', text: booking.split ? 'Split Pay' : 'Full Pay' }].map(d => (
                    <div key={d.icon} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 12 }}>{d.icon}</span>
                      <span style={{ fontSize: 12, color: colors.textMuted }}>{d.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: colors.textDim }}>#{booking.id}</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: colors.primary }}>BDT {booking.amount}</span>
                </div>

                {booking.status === 'pending' && (
                  <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                    <button style={{ flex: 1, padding: '10px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>View Details</button>
                    <button onClick={() => handleCancel(booking.id)} disabled={cancelling === booking.id} style={{ flex: 1, padding: '10px 0', backgroundColor: 'transparent', border: `1px solid ${colors.error}`, borderRadius: 999, color: colors.error, fontWeight: 600, fontSize: 13, cursor: cancelling === booking.id ? 'not-allowed' : 'pointer', opacity: cancelling === booking.id ? 0.7 : 1 }}>{cancelling === booking.id ? 'Cancelling...' : 'Cancel'}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 20 }} />
      </div>

      <button onClick={() => navigate('/home')} style={{ position: 'fixed', bottom: 90, right: 24, backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '10px 20px', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>+ Book Session</button>

      <BottomTabBar />
    </div>
  );
}
