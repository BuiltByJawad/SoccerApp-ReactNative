import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import BottomTabBar from '../../components/BottomTabBar';

const VENUES = [
  { id: '1', name: 'DBox Sports Complex', type: '5v5 Outdoor Turf', location: 'Gulshan, Dhaka', price: 250, rating: 4.8, available: 3, tags: ['5v5', 'Outdoor'] },
  { id: '2', name: 'Premier Football Arena', type: '7v7 Indoor', location: 'Dhanmondi, Dhaka', price: 350, rating: 4.6, available: 1, tags: ['7v7', 'Indoor'] },
  { id: '3', name: 'Green Field Club', type: '11v11 Grass', location: 'Mirpur, Dhaka', price: 500, rating: 4.9, available: 5, tags: ['11v11', 'Grass'] },
  { id: '4', name: 'City Sports Hub', type: '5v5 Futsal', location: 'Uttara, Dhaka', price: 200, rating: 4.5, available: 2, tags: ['5v5', 'Futsal'] },
];

const FILTERS = ['All', '5v5', '7v7', '11v11', 'Indoor', 'Outdoor'];

export default function HomeScreen() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = VENUES.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || v.tags.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ flex: 1, backgroundColor: colors.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: 844 }}>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 24px', borderRadius: '0 0 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, color: colors.textMuted }}>Good Morning 👋</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: colors.text, marginTop: 2 }}>Ready to play?</div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🔔</div>
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
            {filtered.map(venue => (
              <div key={venue.id} onClick={() => navigate(`/venue/${venue.id}`)} style={{ backgroundColor: colors.bgCard, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}`, cursor: 'pointer' }}>
                <div style={{ height: 100, backgroundColor: colors.bgCardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <span style={{ fontSize: 40 }}>🏟️</span>
                  <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: colors.primary, borderRadius: 999, padding: '3px 10px' }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{venue.available} slots</span>
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>{venue.name}</span>
                    <span style={{ fontSize: 13, color: colors.text }}>⭐ {venue.rating}</span>
                  </div>
                  <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>{venue.type}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: colors.textDim }}>📍 {venue.location}</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: colors.primary }}>BDT {venue.price}<span style={{ fontSize: 11, color: colors.textMuted, fontWeight: 400 }}>/person</span></span>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {venue.tags.map(t => <span key={t} style={{ backgroundColor: colors.border, borderRadius: 6, padding: '2px 8px', fontSize: 11, color: colors.textMuted }}>{t}</span>)}
                  </div>
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
