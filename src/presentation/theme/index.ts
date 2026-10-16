export const theme = {
  colors: {
    primary: '#4F46E5', // Indigo-600
    primaryDark: '#3730A3', // Indigo-800
    primaryLight: '#EEF2FF', // Indigo-50
    primaryHover: '#4338CA',

    secondary: '#0EA5E9', // Sky-500
    secondaryLight: '#E0F2FE',

    accent: '#8B5CF6', // Purple-500
    accentLight: '#F3E8FF',

    success: '#10B981', // Emerald-500
    successLight: '#D1FAE5',

    warning: '#F59E0B', // Amber-500
    warningLight: '#FEF3C7',

    danger: '#EF4444', // Red-500
    dangerLight: '#FEE2E2',

    background: '#F8FAFC', // Slate-50
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',

    text: '#0F172A', // Slate-900
    textSecondary: '#64748B', // Slate-500
    textMuted: '#94A3B8', // Slate-400
    textInverse: '#FFFFFF',

    border: '#E2E8F0', // Slate-200
    borderFocus: '#6366F1', // Indigo-500
    borderLight: '#F1F5F9', // Slate-100
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  typography: {
    titleLarge: {
      fontSize: 22,
      fontWeight: '700' as const,
      color: '#0F172A',
    },
    titleMedium: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#0F172A',
    },
    titleSmall: {
      fontSize: 15,
      fontWeight: '600' as const,
      color: '#0F172A',
    },
    bodyLarge: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: '#334155',
    },
    bodyMedium: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#64748B',
    },
    caption: {
      fontSize: 12,
      fontWeight: '500' as const,
      color: '#94A3B8',
    },
  },

  shadows: {
    sm: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 12,
      elevation: 6,
    },
  },
};
