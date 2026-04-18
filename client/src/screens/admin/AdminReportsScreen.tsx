import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Booking, type Venue } from '../../lib/api';

export default function AdminReportsScreen() {
  const [, navigate] = useLocation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.admin.bookings.list(), api.admin.venues.list()])
      .then(([b, v]) => { setBookings(b.bookings); setVenues(v.venues); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const confirmed = bookings.filter(b => b.status === 'confirmed');
  const pending = bookings.filter(b => b.status === 'pending');
  const cancelled = bookings.filter(b => b.status === 'cancelled');
  const totalRevenue = confirmed.reduce((s, b) => s + b.amount, 0);
  const avgBooking = confirmed.length > 0 ? Math.round(totalRevenue / confirmed.length) : 0;

  const venueRevenue = venues.map(v => {
    const vBookings = confirmed.filter(b => b.venueId === v.id);
    return { name: v.name, revenue: vBookings.reduce((s, b) => s + b.amount, 0), bookings: vBookings.length };
  }).sort((a, b) => b.revenue - a.revenue);

  const maxVenueRevenue = Math.max(...venueRevenue.map(v => v.revenue), 1);

  const card: React.CSSProperties = {
    backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}`, marginBottom: 16,
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Reports</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 20 }}>
        {loading ? <div style={{ textAlign: 'center', color: colors.textMuted, padding: 40 }}>Loading...</div> : (
          <>
            <div style={card}>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Booking Summary</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: colors.primary }}>{confirmed.length}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>Confirmed</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: colors.warning }}>{pending.length}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>Pending</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 800, color: colors.error }}>{cancelled.length}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>Cancelled</div>
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Revenue Overview</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ backgroundColor: colors.bgCardAlt, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>BDT {totalRevenue.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>Total Revenue</div>
                </div>
                <div style={{ backgroundColor: colors.bgCardAlt, borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: colors.primary }}>BDT {avgBooking.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: colors.textMuted }}>Avg / Booking</div>
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Revenue by Venue</div>
              {venueRevenue.length === 0 ? <div style={{ fontSize: 13, color: colors.textMuted, textAlign: 'center' }}>No data yet</div> : venueRevenue.map(v => (
                <div key={v.name} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{v.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: colors.primary }}>BDT {v.revenue.toLocaleString()}</span>
                  </div>
                  <div style={{ width: '100%', height: 8, backgroundColor: colors.inputBg, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${(v.revenue / maxVenueRevenue) * 100}%`, height: '100%', backgroundColor: colors.primary, borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>{v.bookings} booking{v.bookings !== 1 ? 's' : ''}</div>
                </div>
              ))}
            </div>

            <div style={card}>
              <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Conversion Rate</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: colors.primary }}>
                  {bookings.length > 0 ? Math.round((confirmed.length / bookings.length) * 100) : 0}%
                </div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>
                  {confirmed.length} of {bookings.length} bookings confirmed
                </div>
              </div>
            </div>
          </>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}
