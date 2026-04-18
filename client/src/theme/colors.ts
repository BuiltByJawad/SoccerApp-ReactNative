type ThemeColors = {
  bg: string;
  bgCard: string;
  bgCardAlt: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  accent: string;
  purple: string;
  purpleLight: string;
  text: string;
  textMuted: string;
  textDim: string;
  border: string;
  borderLight: string;
  error: string;
  success: string;
  warning: string;
  inputBg: string;
  tabBar: string;
};

const darkDefaults: ThemeColors = {
  bg: '#0A0E17',
  bgCard: '#131C2E',
  bgCardAlt: '#0F1923',
  primary: '#4CAF50',
  primaryDark: '#388E3C',
  primaryLight: '#81C784',
  accent: '#66BB6A',
  purple: '#6600A5',
  purpleLight: '#F1DBFF',
  text: '#FFFFFF',
  textMuted: '#8E9BAD',
  textDim: '#5A6A7A',
  border: '#1E2D40',
  borderLight: '#243447',
  error: '#EF5350',
  success: '#4CAF50',
  warning: '#FFA726',
  inputBg: '#1A2535',
  tabBar: '#0D1420',
};

function readCssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

const cssVarByKey: Record<keyof ThemeColors, string> = {
  bg: '--pf-bg',
  bgCard: '--pf-bg-card',
  bgCardAlt: '--pf-bg-card-alt',
  primary: '--pf-primary',
  primaryDark: '--pf-primary-dark',
  primaryLight: '--pf-primary-light',
  accent: '--pf-accent',
  purple: '--pf-purple',
  purpleLight: '--pf-purple-light',
  text: '--pf-text',
  textMuted: '--pf-text-muted',
  textDim: '--pf-text-dim',
  border: '--pf-border',
  borderLight: '--pf-border-light',
  error: '--pf-error',
  success: '--pf-success',
  warning: '--pf-warning',
  inputBg: '--pf-input-bg',
  tabBar: '--pf-tab-bar',
};

export const colors: ThemeColors = new Proxy({} as ThemeColors, {
  get: (_target, prop) => {
    if (typeof prop !== 'string') return undefined;
    if (!(prop in darkDefaults)) return undefined;
    const key = prop as keyof ThemeColors;
    return readCssVar(cssVarByKey[key], darkDefaults[key]);
  },
});
