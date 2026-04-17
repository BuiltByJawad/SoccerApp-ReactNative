import React from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

export default function ConfirmationScreen() {
  const [, navigate] = useLocation();

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '80px 24px 140px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 100, height: 100, borderRadius: 50, border: `3px solid ${colors.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, color: '#fff', fontWeight: 800 }}>✓</div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: colors.text, marginBottom: 8, textAlign: 'center' }}>Booking Confirmed!</div>
        <div style={{ fontSize: 14, color: colors.textMuted, textAlign: 'center', marginBottom: 32, lineHeight: '22px' }}>Your session has been reserved. Get ready to play!</div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: '10px 24px', marginBottom: 24, border: `1px solid ${colors.border}`, textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>Booking ID</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: colors.primary, letterSpacing: 2 }}>#BK001</div>
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}`, width: '100%', marginBottom: 20 }}>
          {[['Event', 'Sunday Fun Day — Morning Session'], ['Date', 'Sunday, 05 July 2025'], ['Time', '9:00 AM – 10:30 AM'], ['Venue', 'DBox Sports Complex'], ['Ground', 'Outdoor Turf 5v5'], ['Payment', 'BDT 275 (Split)'], ['Status', '✅ Paid']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{l}</span>
              <span style={{ fontSize: 13, color: colors.text, fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}`, width: '100%', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Split Payment Status</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            {['You', 'P2', 'P3', 'P4', 'P5'].map((p, i) => (
              <div key={p} style={{ textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: i === 0 ? `${colors.primary}33` : colors.inputBg, border: `2px solid ${i === 0 ? colors.primary : colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px', fontSize: 14, fontWeight: 700, color: i === 0 ? colors.primary : colors.text }}>{p[0]}</div>
                <div style={{ fontSize: 10, color: colors.textMuted }}>{p}</div>
                <div style={{ fontSize: 10, color: i === 0 ? colors.primary : colors.textDim, fontWeight: i === 0 ? 700 : 400 }}>{i === 0 ? 'Paid' : 'Pending'}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: colors.textDim, textAlign: 'center' }}>Teammates have until 12 hours before the session to pay.</div>
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}`, width: '100%', display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 28 }}>⏰</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Set a Reminder</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>We'll notify you 24 hours before your session</div>
          </div>
          <div style={{ backgroundColor: colors.primary, borderRadius: 999, padding: '3px 12px' }}>
            <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>On</span>
          </div>
        </div>
      </div>

      <div style={{ padding: 24, backgroundColor: colors.bgCard, borderTop: `1px solid ${colors.border}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={() => navigate('/bookings')} style={{ width: '100%', padding: '14px 0', backgroundColor: colors.primary, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>View My Bookings</button>
        <button onClick={() => navigate('/home')} style={{ width: '100%', padding: '14px 0', backgroundColor: colors.bgCardAlt, border: `1px solid ${colors.border}`, borderRadius: 999, color: colors.text, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}>Back to Home</button>
      </div>
    </div>
  );
}
