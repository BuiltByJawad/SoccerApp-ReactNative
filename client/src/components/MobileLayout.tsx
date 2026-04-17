import React from 'react';
import { colors } from '../theme/colors';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 390,
        minHeight: 844,
        backgroundColor: colors.bg,
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}
