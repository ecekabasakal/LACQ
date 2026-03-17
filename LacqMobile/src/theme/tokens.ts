// src/theme/tokens.ts
// Lacq — Lumière Design System Tokens

export const Colors = {
  // Primary Brand
  primary: '#c9956a',       // Terracotta — ana marka rengi
  primaryLight: '#e0b898',  // Açık terracotta — hover/secondary
  primaryDark: '#a8724a',   // Koyu terracotta — pressed state

  // Backgrounds
  background: '#faf6f1',    // Warm Cream — ana arka plan
  surface: '#ffffff',       // Pure white — card yüzeyleri
  surfaceWarm: '#f5ede3',   // Warm tinted surface

  // Text
  textPrimary: '#2a1f1a',   // Espresso — ana metin
  textSecondary: '#7a6358', // Warm brown — ikincil metin
  textTertiary: '#b09a8e',  // Muted brown — placeholder, disabled
  textInverse: '#ffffff',   // Beyaz metin (koyu arka plan üzerinde)

  // Semantic
  success: '#6a9c6a',       // Warm green
  warning: '#d4a853',       // Amber
  error: '#c9504a',         // Warm red
  info: '#6a8ec9',          // Soft blue

  // Borders & Dividers
  border: '#e8ddd5',        // Soft border
  borderStrong: '#c9b8ae',  // Strong border
  divider: '#f0e8e0',       // Subtle divider

  // Overlay
  overlay: 'rgba(42, 31, 26, 0.5)',      // Modal overlay
  overlayLight: 'rgba(42, 31, 26, 0.1)', // Subtle overlay

  // Special
  gold: '#c9a96a',          // Accent gold
  cream: '#faf6f1',         // Same as background
  nude: '#e8d5c4',          // Soft nude
} as const;

export const Typography = {
  // Font Families
  fontDisplay: 'CormorantGaramond-Italic',  // Başlıklar
  fontDisplayRegular: 'CormorantGaramond-Regular',
  fontBody: 'DMSans-Regular',               // Body metinleri
  fontBodyMedium: 'DMSans-Medium',
  fontBodyBold: 'DMSans-Bold',

  // Font Sizes
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 30,
    '3xl': 38,
    '4xl': 48,
  },

  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },

  // Presets (kullanıma hazır text style'ları)
  preset: {
    displayLarge: {
      fontFamily: 'CormorantGaramond-Italic',
      fontSize: 48,
      lineHeight: 56,
      letterSpacing: -0.5,
      color: '#2a1f1a',
    },
    displayMedium: {
      fontFamily: 'CormorantGaramond-Italic',
      fontSize: 38,
      lineHeight: 46,
      letterSpacing: -0.3,
      color: '#2a1f1a',
    },
    heading1: {
      fontFamily: 'CormorantGaramond-Regular',
      fontSize: 30,
      lineHeight: 38,
      color: '#2a1f1a',
    },
    heading2: {
      fontFamily: 'CormorantGaramond-Regular',
      fontSize: 24,
      lineHeight: 30,
      color: '#2a1f1a',
    },
    heading3: {
      fontFamily: 'DMSans-Medium',
      fontSize: 20,
      lineHeight: 26,
      color: '#2a1f1a',
    },
    body: {
      fontFamily: 'DMSans-Regular',
      fontSize: 15,
      lineHeight: 22,
      color: '#2a1f1a',
    },
    bodySmall: {
      fontFamily: 'DMSans-Regular',
      fontSize: 13,
      lineHeight: 18,
      color: '#7a6358',
    },
    label: {
      fontFamily: 'DMSans-Medium',
      fontSize: 13,
      lineHeight: 16,
      letterSpacing: 1,
      color: '#2a1f1a',
    },
    caption: {
      fontFamily: 'DMSans-Regular',
      fontSize: 11,
      lineHeight: 14,
      color: '#b09a8e',
    },
    button: {
      fontFamily: 'DMSans-Medium',
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0.5,
    },
  },
} as const;

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 28,
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#2a1f1a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#2a1f1a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#2a1f1a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadow: Shadow,
} as const;

export type ThemeColors = typeof Colors;
export type ThemeTypography = typeof Typography;
export type ThemeSpacing = typeof Spacing;