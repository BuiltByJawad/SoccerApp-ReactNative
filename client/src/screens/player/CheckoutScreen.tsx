import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

const METHODS = [{ id: 'bkash', label: 'bKash', icon: '💳' }, { id: 'nagad', label: 'Nagad', icon: '📱' }, { id: 'card', label: 'Card', icon: '🏦' }, { id: 'cash', label: 'Cash', icon: '💵' }];

export default function CheckoutScreen() {
  const [, navigate] = useLocation();
  const [payMode, setPayMode] = useState<'full' | 'split'>('split');
  const [method, setMethod] = useState('bkash');

  const total = payMode === 'split' ? 275 : 525;

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate(-1 as any)} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>Checkout</span>
        <div style={{ width: 50 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24, paddingBottom: 100 }}>
        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, display: 'flex', gap: 16, border: `1px solid ${colors.border}`, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 4 }}>Sunday Fun Day, 05 July</div>
            <div style={{ fontSize: 12, color: colors.primary, marginBottom: 6 }}>Morning Session</div>
            <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>Outdoor Turf Ground 5v5</div>
            <div style={{ fontSize: 12, color: colors.textMuted }}>DBox Sports Complex</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingLeft: 16, borderLeft: `1px solid ${colors.border}` }}>
            <span style={{ fontSize: 32, marginBottom: 4 }}>⚽</span>
            <span style={{ fontSize: 12, color: colors.textMuted }}>90 Mins</span>
          </div>
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Payment Mode</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[{ id: 'full', icon: '💰', label: 'Full Payment', amount: 'BDT 500', desc: 'Pay for full session', color: colors.primary }, { id: 'split', icon: '🤝', label: 'Split Payment', amount: 'BDT 250', desc: 'Pay your share only', color: colors.purple }].map(m => (
            <div key={m.id} onClick={() => setPayMode(m.id as any)} style={{ flex: 1, borderRadius: 16, padding: 16, textAlign: 'center', border: `1px solid ${payMode === m.id ? colors.primary : colors.border}`, backgroundColor: payMode === m.id ? `${colors.primary}11` : colors.bgCard, cursor: 'pointer' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: colors.text, marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: m.color, marginBottom: 4 }}>{m.amount}</div>
              <div style={{ fontSize: 10, color: colors.textMuted }}>{m.desc}</div>
            </div>
          ))}
        </div>

        {payMode === 'split' && (
          <div style={{ backgroundColor: '#00C85322', borderRadius: 12, padding: 14, border: '1px solid #00C85344', marginBottom: 16 }}>
            <span style={{ color: '#00C853', fontSize: 13 }}>✅ 100% refund guaranteed if teammates don't pay 12 hours before the session.</span>
          </div>
        )}

        <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 12 }}>Payment Method</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {METHODS.map(m => (
            <div key={m.id} onClick={() => setMethod(m.id)} style={{ backgroundColor: colors.bgCard, borderRadius: 12, padding: 16, textAlign: 'center', border: `1px solid ${method === m.id ? colors.primary : colors.border}`, cursor: 'pointer', position: 'relative' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: method === m.id ? colors.text : colors.textMuted }}>{m.label}</div>
              {method === m.id && <div style={{ position: 'absolute', top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>✓</div>}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, border: `1px solid ${colors.border}`, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span>📋</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: colors.text }}>Cancellation Policy</span>
          </div>
          <div style={{ height: 1, backgroundColor: colors.border, marginBottom: 10 }} />
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 6 }}>✔ Cancel 24+ hours before: Full refund</div>
          <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 10 }}>🔁 Cancel 12–24 hours before: 50% refund</div>
          <div style={{ backgroundColor: colors.inputBg, borderRadius: 8, padding: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 11, color: colors.textDim, textAlign: 'center' }}>Service fees are non-refundable. Refunds processed within 2 business days.</div>
          </div>
          <div style={{ backgroundColor: `${colors.error}22`, borderRadius: 8, padding: 8 }}>
            <div style={{ fontSize: 11, color: colors.error, textAlign: 'center' }}>Cancel anytime up to 24 hrs before for a full refund.</div>
          </div>
        </div>

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, padding: 20, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.text, marginBottom: 16 }}>Order Summary</div>
          {[['Session Fee', 'BDT 500'], ['Your Share', `BDT ${payMode === 'split' ? 250 : 500}`], ['Service Fee', 'BDT 25']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: colors.textMuted }}>{l}</span>
              <span style={{ fontSize: 13, color: colors.text, fontWeight: 600 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: colors.border, margin: '12px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: colors.text }}>Total</span>
            <span style={{ fontSize: 20, fontWeight: 800, color: colors.primary }}>BDT {total}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: 24, backgroundColor: colors.bgCard, borderTop: `1px solid ${colors.border}` }}>
        <button onClick={() => navigate('/confirmation')} style={{ width: '100%', padding: '16px 0', backgroundColor: colors.purple, border: 'none', borderRadius: 999, color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          Proceed to Pay — BDT {total}
        </button>
      </div>
    </div>
  );
}
