import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { colors } from '../../theme/colors';

export default function SplashScreen() {
  const [, navigate] = useLocation();

  useEffect(() => {
    const t = setTimeout(() => navigate('/login'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg, minHeight: 844, position: 'relative', overflow: 'hidden' }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          bottom: `${i * 60}px`,
          left: -20,
          right: -20,
          height: 2,
          backgroundColor: colors.primary,
          opacity: 0.03 + i * 0.02,
        }} />
      ))}

      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <div style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.bgCard,
          border: `2px solid ${colors.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: 48,
        }}>⚽</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: colors.text, letterSpacing: 1 }}>PlayField</div>
        <div style={{ fontSize: 14, color: colors.primary, letterSpacing: 4, marginTop: 4 }}>BOOK. PLAY. WIN.</div>
      </div>

      <div style={{ position: 'absolute', bottom: 60, display: 'flex', gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: i === 0 ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === 0 ? colors.primary : colors.border,
          }} />
        ))}
      </div>
    </div>
  );
}
