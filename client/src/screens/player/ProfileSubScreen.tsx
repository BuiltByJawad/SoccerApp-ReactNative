import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

type SubItem = { label: string; detail?: string; icon?: string };

type SubContent = { title: string; icon: string; items: SubItem[]; info?: string };

const CONTENT: Record<string, SubContent> = {
  payment: {
    title: 'Payment Methods',
    icon: '💳',
    info: 'Payments are processed securely via SSLCommerz at checkout. No need to save cards — just choose your method when booking.',
    items: [
      { label: 'bKash', detail: 'Mobile banking — instant', icon: '📱' },
      { label: 'Nagad', detail: 'Mobile banking — instant', icon: '📱' },
      { label: 'Visa / Mastercard', detail: 'Credit or debit card', icon: '💳' },
      { label: 'Cash on Site', detail: 'Pay at the venue counter', icon: '💵' },
    ],
  },
  notifications: {
    title: 'Notifications',
    icon: '🔔',
    items: [
      { label: 'Booking confirmations', detail: 'Real-time via WebSocket' },
      { label: 'Session reminders', detail: '24 hours before session' },
      { label: 'Payment receipts', detail: 'After successful payment' },
      { label: 'Cancellation alerts', detail: 'Instant notification' },
    ],
  },
  settings: {
    title: 'Settings',
    icon: '⚙️',
    items: [
      { label: 'Language', detail: 'English' },
      { label: 'Currency', detail: 'BDT' },
      { label: 'Auto-reminders', detail: 'On' },
    ],
  },
  help: {
    title: 'Help & Support',
    icon: '❓',
    items: [
      { label: 'FAQ', detail: 'playfield.com/help' },
      { label: 'Email', detail: 'support@playfield.com' },
      { label: 'Phone', detail: '+880 1XXX-XXXXXX' },
      { label: 'Response time', detail: 'Within 24 hours' },
    ],
  },
  terms: {
    title: 'Terms & Privacy',
    icon: '📄',
    items: [
      { label: 'Terms of Service', detail: 'playfield.com/terms' },
      { label: 'Privacy Policy', detail: 'playfield.com/privacy' },
      { label: 'Refund Policy', detail: 'Full refund 24h+ before session' },
      { label: 'Data', detail: 'We never share your personal data' },
    ],
  },
};

export default function ProfileSubScreen({ section }: { section: string }) {
  const [, navigate] = useLocation();
  const data = CONTENT[section] || CONTENT.settings;
  const [isLight, setIsLight] = useState(() => localStorage.getItem('pf-theme') === 'light');

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('pf-light');
      localStorage.setItem('pf-theme', 'light');
    } else {
      document.documentElement.classList.remove('pf-light');
      localStorage.setItem('pf-theme', 'dark');
    }
  };

  return (
    <div style={{ backgroundColor: colors.bg, minHeight: 844, display: 'flex', flexDirection: 'column' }}>
      <div style={{ backgroundColor: colors.bgCard, padding: '60px 24px 16px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', color: colors.primary, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
        <span style={{ fontSize: 17, fontWeight: 700, color: colors.text }}>{data.icon} {data.title}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
        {data.info && <div style={{ backgroundColor: `${colors.primary}11`, border: `1px solid ${colors.primary}33`, borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13, color: colors.textMuted }}>{data.info}</div>}

        {section === 'settings' && (
          <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, border: `1px solid ${colors.border}`, padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>Theme</div>
              <div style={{ fontSize: 12, color: colors.textMuted }}>Switch dark / light mode</div>
            </div>
            <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: colors.inputBg, border: `1px solid ${colors.border}`, cursor: 'pointer', fontSize: 16, color: colors.textMuted, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{isLight ? '🌙' : '☀️'}</button>
          </div>
        )}

        <div style={{ backgroundColor: colors.bgCard, borderRadius: 16, border: `1px solid ${colors.border}`, overflow: 'hidden' }}>
          {data.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: i < data.items.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
              {item.icon && <span style={{ fontSize: 18, marginRight: 12 }}>{item.icon}</span>}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: colors.text, fontWeight: 500 }}>{item.label}</div>
                {item.detail && <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 2 }}>{item.detail}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
