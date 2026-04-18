import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import BottomTabBar from '../../components/BottomTabBar';
import { api, type Booking, type Venue } from '../../lib/api';
import { useSocket } from '../../hooks/useSocket';
import { useAuth } from '../../hooks/useAuth';

const FILTERS = ['All', '5v5', '7v7', '11v11', 'Indoor', 'Outdoor'];

export default function HomeScreen() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotif, setShowNotif] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useAuth();
  const { onBookingCreated, onBookingCancelled, onBookingStatus } = useSocket(user?.id);

  useEffect(() => {
    api.venues.list()
      .then(res => setVenues(res.venues.filter(v => v.active)))
      .catch(console.error)
      .finally(() => setLoading(false));
    api.bookings.list()
      .then(res => setBookings(res.bookings))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const unsub1 = onBookingCreated((data) => {
      setBookings(prev => [data.booking, ...prev]);
      setShowNotif(true);
    });
    const unsub2 = onBookingCancelled((data) => {
      setBookings(prev => prev.map(b => b.id === data.booking.id ? data.booking : b));
    });
    const unsub3 = onBookingStatus((data) => {
      setBookings(prev => prev.map(b => b.id === data.booking.id ? data.booking : b));
    });
    return () => { unsub1(); unsub2(); unsub3(); };
  }, [onBookingCreated, onBookingCancelled, onBookingStatus]);

  const filtered = venues.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || v.type.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ flex: 1, backgroundColor: colors.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: 844 }}>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 24px', borderRadius: '0 0 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, color: colors.textMuted }}>{(() => { const h = new Date().getHours(); if (h < 12) return 'Good Morning ☀️'; if (h < 17) return 'Good Afternoon 🌤️'; return 'Good Evening 🌅'; })()} 👋</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: colors.text, marginTop: 2 }}>Ready to play?</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowNotif(!showNotif)} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>🔔</button>
                {bookings.filter(b => b.status === 'pending').length > 0 && <div style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: 8, backgroundColor: colors.error, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{bookings.filter(b => b.status === 'pending').length}</div>}
                {showNotif && (
                  <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 48, right: -8, width: 280, backgroundColor: colors.bgCard, borderRadius: 16, border: `1px solid ${colors.border}`, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', zIndex: 200, overflow: 'hidden' }}>
                    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${colors.border}`, fontSize: 14, fontWeight: 700, color: colors.text }}>Notifications</div>
                    {bookings.length === 0 ? <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: colors.textMuted }}>No notifications yet</div> : bookings.slice(0, 5).map(b => (
                      <div key={b.id} style={{ padding: '10px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: b.status === 'confirmed' ? `${colors.success}22` : b.status === 'pending' ? `${colors.warning}22` : `${colors.error}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{b.status === 'confirmed' ? '✅' : b.status === 'pending' ? '⏳' : '❌'}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{b.type} Booking {b.status}</div>
                          <div style={{ fontSize: 11, color: colors.textMuted }}>{b.dateLabel} · {b.timeLabel}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: colors.primary }}>BDT {b.amount}</span>
                      </div>
                    ))}
                    {bookings.length > 5 && <div onClick={() => { navigate('/bookings'); setShowNotif(false); }} style={{ padding: 12, textAlign: 'center', fontSize: 12, color: colors.primary, fontWeight: 600, cursor: 'pointer' }}>View All</div>}
                  </div>
                )}
              </div>
              <button onClick={async () => { try { await api.auth.logout(); } catch {} navigate('/login'); }} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer', color: colors.textMuted }}>⏻</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: colors.inputBg, borderRadius: 999, padding: '0 16px', border: `1px solid ${colors.border}` }}>
            <span style={{ marginRight: 8 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search venues, locations..." style={{ flex: 1, background: 'none', border: 'none', color: colors.text, fontSize: 14, padding: '12px 0', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '16px 24px' }}>
          {[{ label: 'Sessions', value: '12' }, { label: 'Venues', value: '4' }, { label: 'Hours', value: '18h' }].map(s => (
            <div key={s.label} style={{ flex: 1, backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>{s.value}</div>
              <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 24px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.text }}>Upcoming Sessions</div>
            <span style={{ color: colors.primary, fontSize: 13, cursor: 'pointer' }}>See all</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {[{ date: 'Today', time: '6:00 PM', venue: 'DBox Sports', sport: '5v5' }, { date: 'Sunday', time: '9:00 AM', venue: 'Premier Arena', sport: '7v7' }].map((s, i) => (
              <div key={i} style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, minWidth: 160, border: `1px solid ${colors.border}` }}>
                <div style={{ backgroundColor: `${colors.primary}22`, borderRadius: 6, padding: '2px 8px', display: 'inline-block', marginBottom: 8 }}>
                  <span style={{ color: colors.primary, fontSize: 11, fontWeight: 700 }}>{s.date}</span>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: colors.text, marginBottom: 2 }}>{s.time}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>{s.venue}</div>
                <div style={{ backgroundColor: colors.border, borderRadius: 6, padding: '2px 8px', display: 'inline-block' }}>
                  <span style={{ color: colors.text, fontSize: 11, fontWeight: 600 }}>{s.sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 24px 16px' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '6px 16px', borderRadius: 999, backgroundColor: activeFilter === f ? colors.primary : colors.bgCard, border: `1px solid ${activeFilter === f ? colors.primary : colors.border}`, color: activeFilter === f ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}>{f}</button>
          ))}
        </div>

        <div style={{ padding: '0 24px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Venues Near You</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 20 }}>Loading venues...</div> : filtered.map(venue => (
              <div key={venue.id} onClick={() => navigate(`/venue/${venue.id}`)} style={{ backgroundColor: colors.bgCard, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                <div style={{ height: 100, backgroundColor: colors.bgCardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  {venue.imageUrl ? <img src={venue.imageUrl} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, color: '#fff' }}>{venue.name[0]}</div>}
                  <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: colors.primary, borderRadius: 999, padding: '3px 10px' }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{venue.slots} slots</span>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 4 }}>{venue.name}</div>
                  <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>{venue.type}</div>
                  <div style={{ fontSize: 12, color: colors.textDim }}>📍 {venue.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 20 }} />
        </div>
      </div>
      <BottomTabBar />
    </div>
  );
}
