import React from 'react';
import { useLocation } from 'wouter';
import { colors } from '../theme/colors';

const TABS = [
  { icon: '🏟️', label: 'Home', path: '/home' },
  { icon: '📋', label: 'Bookings', path: '/bookings' },
  { icon: '👤', label: 'Profile', path: '/profile' },
];

export default function BottomTabBar() {
  const [location, navigate] = useLocation();

  return (
    <div style={{
      position: 'sticky',
      bottom: 0,
      backgroundColor: colors.tabBar,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      height: 70,
      zIndex: 100,
    }}>
      {TABS.map(tab => {
        const active = location === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              paddingTop: 6,
            }}
          >
            <span style={{ fontSize: 22 }}>{tab.icon}</span>
            <span style={{ fontSize: 11, color: active ? colors.primary : colors.textDim, fontWeight: active ? 700 : 400 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
