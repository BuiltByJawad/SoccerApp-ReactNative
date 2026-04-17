import React, { useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { colors } from '../../theme/colors';

const DATES = ['Mon 30', 'Tue 01', 'Wed 02', 'Thu 03', 'Fri 04', 'Sat 05', 'Sun 06'];
const SLOTS = [{ time: '6:00 AM', spots: 8, price: 250 }, { time: '8:00 AM', spots: 4, price: 250 }, { time: '4:00 PM', spots: 10, price: 300 }, { time: '6:00 PM', spots: 2, price: 300 }];
const FORMATS = ['5v5', '7v7', '11v11'];

export default function BookSessionScreen() {
  const [, navigate] = useLocation();
  const params = useParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('5v5');

  const selectedPrice = SLOTS.find(s => s.time === selectedSlot)?.price || 0;

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(`/venue/${params.id}`)} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Book a Session</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 100 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Select Date</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 24 }}>
          {DATES.map((d, i) => {
            const [day, date] = d.split(' ');
            return (
              <div key={i} onClick={() => setSelectedDate(i)} style={{ backgroundColor: selectedDate === i ? colors.primary : colors.bgCard, borderRadius: 10, padding: '8px 4px', textAlign: 'center', cursor: 'pointer', border: `1px solid ${selectedDate === i ? colors.primary : colors.border}` }}>
                <div style={{ fontSize: 9, color: selectedDate === i ? '#fff' : colors.textMuted, marginBottom: 2 }}>{day}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: selectedDate === i ? '#fff' : colors.text }}>{date}</div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Format</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {FORMATS.map(f => <button key={f} onClick={() => setSelectedFormat(f)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, backgroundColor: selectedFormat === f ? colors.primary : colors.bgCard, border: `1px solid ${selectedFormat === f ? colors.primary : colors.border}`, color: selectedFormat === f ? '#fff' : colors.textMuted, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>{f}</button>)}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Available Time Slots</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {SLOTS.map(slot => (
            <div key={slot.time} onClick={() => setSelectedSlot(slot.time)} style={{ borderRadius: 12, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: `1px solid ${selectedSlot === slot.time ? colors.primary : colors.border}`, backgroundColor: selectedSlot === slot.time ? `${colors.primary}11` : colors.bgCard, cursor: 'pointer' }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: colors.text, marginBottom: 2 }}>{slot.time}</div>
                <div style={{ fontSize: 12, color: colors.textMuted }}>{slot.spots} spots remaining</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: colors.primary }}>BDT {slot.price}</div>
                <div style={{ fontSize: 10, color: colors.textDim }}>per person</div>
              </div>
              {selectedSlot === slot.time && <div style={{ position: 'absolute', right: 40, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</div>}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Booking Summary</div>
          {[['Date', 'Saturday, 05 July 2025'], ['Time', selectedSlot || '—'], ['Format', selectedFormat], ['Duration', '90 Minutes']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{l}</span>
              <span style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: colors.border, margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>BDT {selectedPrice}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: 24, backgroundColor: colors.bgCard, borderTop: `1px solid ${colors.border}` }}>
        <button disabled={!selectedSlot} onClick={() => navigate('/checkout')} style={{ width: '100%', padding: '16px 0', backgroundColor: selectedSlot ? colors.primary : colors.border, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 16, cursor: selectedSlot ? 'pointer' : 'not-allowed' }}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
}
