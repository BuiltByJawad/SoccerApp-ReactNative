import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Venue } from '../../lib/api';

export default function VenueDetailsScreen() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.venues.get(params.id)
      .then(res => setVenue(res.venue))
      .catch(() => navigate('/home'))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading || !venue) {
    return <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, overflowY: 'auto', paddingBottom: 100 }}>
      <div style={{ height: 220, backgroundColor: colors.bgCard, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        {venue.imageUrl ? <img src={venue.imageUrl} alt={venue.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, fontWeight: 800, color: '#fff' }}>{venue.name[0]}</div>}
        <button onClick={() => navigate('/home')} style={{ position: 'absolute', top: 50, left: 16, width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(10,14,23,0.8)', border: 'none', cursor: 'pointer', fontSize: 18, color: colors.text }}>←</button>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: colors.text, marginBottom: 4 }}>{venue.name}</div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>{venue.type}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 24, fontSize: 13, color: colors.textMuted }}>📍 {venue.location}</div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[{ label: 'Slots', value: String(venue.slots) }, { label: 'Format', value: venue.type.split(' ')[0] }, { label: 'Status', value: venue.active ? 'Open' : 'Closed' }].map(s => (
            <div key={s.label} style={{ flex: 1, backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 10, color: colors.textMuted, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.primary }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Available Slots</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {Array.from({ length: venue.slots }, (_, i) => {
            const hour = 6 + i * 2;
            const timeStr = hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
            return (
              <div key={timeStr} onClick={() => navigate(`/book/${params.id}`)} style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 14, textAlign: 'center', border: `1px solid ${colors.primary}44`, cursor: 'pointer' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>{timeStr}</div>
                <div style={{ fontSize: 11, color: colors.primary, marginTop: 2 }}>Available</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 390, backgroundColor: colors.bgCard, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}` }}>
        <div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>{venue.slots} slots available</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>{venue.name}</div>
        </div>
        <button onClick={() => navigate(`/book/${params.id}`)} style={{ backgroundColor: colors.primary, border: 'none', borderRadius: 999, padding: '14px 28px', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Book Now</button>
      </div>
    </div>
  );
}
