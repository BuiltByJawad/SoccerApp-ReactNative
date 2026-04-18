import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { colors } from '../../theme/colors';
import { api, type Venue } from '../../lib/api';


const FORMATS = ['5v5', '7v7', '11v11'];
const BASE_AMOUNT = 250;
const SERVICE_FEE = 25;

export default function BookSessionScreen() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('5v5');
  const [split, setSplit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });

  const dateLabel = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });

  const next7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { value: d.toISOString().split('T')[0], label: d.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }) };
  });

  useEffect(() => {
    api.venues.get(params.id)
      .then(res => setVenue(res.venue))
      .catch(() => navigate('/home'));
  }, [params.id]);

  const timeSlots = venue
    ? Array.from({ length: venue.slots }, (_, i) => {
        const hour = 6 + i * 2;
        return hour < 12 ? `${hour}:00 AM` : hour === 12 ? '12:00 PM' : `${hour - 12}:00 PM`;
      })
    : [];

  const handleBook = async () => {
    if (!venue || !selectedSlot) return;
    const qs = new URLSearchParams({
      venueId: venue.id,
      venueName: venue.name,
      time: selectedSlot,
      format: selectedFormat,
      split: String(split),
      date: selectedDate,
      dateLabel,
    }).toString();
    navigate(`/checkout?${qs}`);
  };

  if (!venue) {
    return <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(`/venue/${params.id}`)} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Book a Session</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 100 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Select Date</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, overflowX: 'auto', paddingBottom: 4 }}>
          {next7Days.map(d => (
            <div key={d.value} onClick={() => setSelectedDate(d.value)} style={{ minWidth: 72, padding: '12px 8px', borderRadius: 12, textAlign: 'center', border: `1px solid ${selectedDate === d.value ? colors.primary : colors.border}`, backgroundColor: selectedDate === d.value ? `${colors.primary}11` : colors.bgCard, cursor: 'pointer' }}>
              <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>{d.label.split(',')[0]}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: selectedDate === d.value ? colors.primary : colors.text }}>{d.label.split(',')[1]?.trim()}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Format</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {FORMATS.map(f => <button key={f} onClick={() => setSelectedFormat(f)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, backgroundColor: selectedFormat === f ? colors.primary : colors.bgCard, border: `1px solid ${selectedFormat === f ? colors.primary : colors.border}`, color: selectedFormat === f ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{f}</button>)}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Available Time Slots</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {timeSlots.map(time => (
            <div key={time} onClick={() => setSelectedSlot(time)} style={{ borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${selectedSlot === time ? colors.primary : colors.border}`, backgroundColor: selectedSlot === time ? `${colors.primary}11` : colors.bgCard, cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 2 }}>{time}</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{venue.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: colors.primary }}>BDT {BASE_AMOUNT}</div>
                <div style={{ fontSize: 10, color: colors.textDim }}>per person</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <button onClick={() => setSplit(false)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, backgroundColor: !split ? colors.primary : colors.bgCard, border: `1px solid ${!split ? colors.primary : colors.border}`, color: !split ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Full Pay</button>
          <button onClick={() => setSplit(true)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, backgroundColor: split ? colors.primary : colors.bgCard, border: `1px solid ${split ? colors.primary : colors.border}`, color: split ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Split Pay</button>
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Booking Summary</div>
          {[['Venue', venue.name], ['Time', selectedSlot || '—'], ['Format', selectedFormat], ['Payment', split ? 'Split' : 'Full']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{l}</span>
              <span style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: colors.border, margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>BDT {split ? BASE_AMOUNT + SERVICE_FEE : BASE_AMOUNT * 2 + SERVICE_FEE}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: 24, backgroundColor: colors.bgCard, borderTop: `1px solid ${colors.border}` }}>
        <button disabled={!selectedSlot} onClick={handleBook} style={{ width: '100%', padding: '16px 0', backgroundColor: selectedSlot ? colors.primary : colors.border, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: selectedSlot ? 'pointer' : 'not-allowed' }}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
