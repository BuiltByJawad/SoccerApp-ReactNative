import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const VENUES = [
  { id: '1', name: 'DBox Sports Complex', type: '5v5 Outdoor', location: 'Gulshan', slots: 6, bookings: 47, revenue: 12500, active: true },
  { id: '2', name: 'Premier Football Arena', type: '7v7 Indoor', location: 'Dhanmondi', slots: 4, bookings: 32, revenue: 9800, active: true },
  { id: '3', name: 'Green Field Club', type: '11v11 Grass', location: 'Mirpur', slots: 3, bookings: 28, revenue: 14200, active: true },
  { id: '4', name: 'City Sports Hub', type: '5v5 Futsal', location: 'Uttara', slots: 8, bookings: 55, revenue: 8400, active: false },
];

export default function AdminVenuesScreen() {
  const [, navigate] = useLocation();
  const [venues, setVenues] = useState(VENUES);

  const toggleActive = (id: string) => setVenues(prev => prev.map(v => v.id === id ? { ...v, active: !v.active } : v));

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Manage Venues</span>
        <button style={{ backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '6px 14px', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>+ Add</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[{ label: 'Total', value: venues.length }, { label: 'Active', value: venues.filter(v => v.active).length }, { label: 'Bookings', value: venues.reduce((s, v) => s + v.bookings, 0) }].map(s => (
            <div key={s.label} style={{ flex: 1, backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>{s.value}</div>
              <div style={{ fontSize: 10, color: colors.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {venues.map(venue => (
            <div key={venue.id} style={{ backgroundColor: colors.bgCard, borderRadius: 16, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
              <div style={{ height: 80, backgroundColor: colors.bgCardAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <span style={{ fontSize: 36 }}>🏟️</span>
                <div style={{ position: 'absolute', top: 10, left: 10, backgroundColor: `${venue.active ? colors.primary : colors.error}22`, border: `1px solid ${venue.active ? colors.primary : colors.error}44`, borderRadius: 999, padding: '3px 10px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: venue.active ? colors.primary : colors.error }}>{venue.active ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>{venue.name}</span>
                  <button onClick={() => toggleActive(venue.id)} style={{ backgroundColor: `${colors.error}22`, border: `1px solid ${colors.error}44`, borderRadius: 999, padding: '4px 12px', color: colors.error, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{venue.active ? 'Disable' : 'Enable'}</button>
                </div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 16 }}>{venue.type} · 📍 {venue.location}</div>

                <div style={{ display: 'flex', backgroundColor: colors.inputBg, borderRadius: 10, padding: 10, marginBottom: 16 }}>
                  {[{ label: 'Slots', value: venue.slots }, { label: 'Bookings', value: venue.bookings }, { label: 'Revenue', value: `৳${(venue.revenue / 1000).toFixed(1)}K` }].map(s => (
                    <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: colors.primary }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: colors.textMuted }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button style={{ flex: 1, padding: '10px 0', backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.text, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>✏️ Edit Details</button>
                  <button style={{ flex: 1, padding: '10px 0', backgroundColor: `${colors.primary}22`, border: `1px solid ${colors.primary}44`, borderRadius: 999, color: colors.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>🕐 Manage Slots</button>
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
