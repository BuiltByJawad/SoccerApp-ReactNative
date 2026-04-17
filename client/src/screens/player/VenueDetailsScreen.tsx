import React from 'react';
import { useLocation, useParams } from 'wouter';
import { colors } from '../../theme/colors';

const VENUE_DATA: Record<string, any> = {
  '1': { name: 'DBox Sports Complex', type: 'Outdoor Turf Ground 5v5', location: 'Plot 12, Gulshan-2, Dhaka', price: 250, rating: 4.8, totalReviews: 126, description: 'A premium outdoor turf facility with FIFA-approved synthetic grass, floodlights, and changing rooms. Perfect for evening and weekend sessions.', amenities: ['Changing Rooms', 'Floodlights', 'Parking', 'Water', 'First Aid', 'Referee'], slots: [{ time: '6:00 AM', available: true, spotsLeft: 8 }, { time: '8:00 AM', available: true, spotsLeft: 4 }, { time: '10:00 AM', available: false, spotsLeft: 0 }, { time: '4:00 PM', available: true, spotsLeft: 10 }, { time: '6:00 PM', available: true, spotsLeft: 2 }, { time: '8:00 PM', available: false, spotsLeft: 0 }] },
  '2': { name: 'Premier Football Arena', type: '7v7 Indoor', location: 'Dhanmondi, Dhaka', price: 350, rating: 4.6, totalReviews: 89, description: 'State-of-the-art indoor arena with climate control.', amenities: ['AC', 'Locker Rooms', 'Cafeteria', 'Referee'], slots: [{ time: '8:00 AM', available: true, spotsLeft: 6 }, { time: '6:00 PM', available: true, spotsLeft: 1 }] },
  '3': { name: 'Green Field Club', type: '11v11 Grass', location: 'Mirpur, Dhaka', price: 500, rating: 4.9, totalReviews: 203, description: 'Natural grass ground for full-format football.', amenities: ['Natural Grass', 'Floodlights', 'Parking', 'Water'], slots: [{ time: '7:00 AM', available: true, spotsLeft: 16 }, { time: '4:00 PM', available: true, spotsLeft: 8 }] },
  '4': { name: 'City Sports Hub', type: '5v5 Futsal', location: 'Uttara, Dhaka', price: 200, rating: 4.5, totalReviews: 67, description: 'Affordable futsal courts with great lighting.', amenities: ['Futsal Court', 'Lockers', 'Water'], slots: [{ time: '9:00 AM', available: true, spotsLeft: 8 }, { time: '7:00 PM', available: true, spotsLeft: 4 }] },
};

export default function VenueDetailsScreen() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const venue = VENUE_DATA[params.id] || VENUE_DATA['1'];

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 220, backgroundColor: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: 80 }}>🏟️</span>
        <button onClick={() => navigate('/home')} style={{ position: 'absolute', top: 50, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(10,14,23,0.8)', border: 'none', cursor: 'pointer', fontSize: 18, color: colors.text }}>←</button>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ flex: 1, marginRight: 12 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>{venue.name}</div>
            <div style={{ fontSize: 13, color: colors.textMuted }}>{venue.type}</div>
          </div>
          <div style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 12, textAlign: 'center', border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text }}>⭐ {venue.rating}</div>
            <div style={{ fontSize: 10, color: colors.textMuted }}>{venue.totalReviews} reviews</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24, fontSize: 13, color: colors.textMuted }}>📍 {venue.location}</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ label: 'Per Person', value: `BDT ${venue.price}` }, { label: 'Duration', value: '90 Mins' }, { label: 'Format', value: '5v5' }].map(s => (
            <div key={s.label} style={{ flex: 1, backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 10, color: colors.textMuted, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.primary }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>About</div>
        <div style={{ fontSize: 14, color: colors.textMuted, lineHeight: '22px', marginBottom: 24 }}>{venue.description}</div>

        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 8 }}>Amenities</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {venue.amenities.map((a: string) => <span key={a} style={{ backgroundColor: colors.bgCard, borderRadius: 999, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: colors.text, border: `1px solid ${colors.border}` }}>✓ {a}</span>)}
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Available Slots — Today</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {venue.slots.map((slot: any) => (
            <div key={slot.time} onClick={() => slot.available && navigate(`/book/${params.id}`)} style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 14, textAlign: 'center', border: `1px solid ${slot.available ? `${colors.primary}44` : colors.border}`, opacity: slot.available ? 1 : 0.5, cursor: slot.available ? 'pointer' : 'default' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: slot.available ? colors.text : colors.textDim }}>{slot.time}</div>
              <div style={{ fontSize: 11, color: slot.available ? colors.primary : colors.error, marginTop: 2 }}>{slot.available ? `${slot.spotsLeft} spots` : 'Full'}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, backgroundColor: colors.bgCard, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}` }}>
        <div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>Starting from</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>BDT {venue.price}<span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 400 }}>/person</span></div>
        </div>
        <button onClick={() => navigate(`/book/${params.id}`)} style={{ backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '14px 28px', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Book Now</button>
      </div>
    </div>
  );
}
