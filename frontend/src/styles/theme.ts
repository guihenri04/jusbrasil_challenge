export const theme = {
  colors: {
    primary: '#0066CC',
    primaryDark: '#0052A3',
    primaryLight: '#3385D6',
    
    secondary: '#00A650',
    secondaryDark: '#00842F',
    
    background: '#FFFFFF',
    backgroundAlt: '#F8F9FA',
    
    text: '#1A1A1A',
    textSecondary: '#666666',
    textMuted: '#999999',
    
    border: '#E1E5E9',
    borderLight: '#F1F3F5',
    
    gray100: '#F8F9FA',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#6C757D',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#212529',
    
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',
    
    white: '#FFFFFF',
    black: '#000000',
    
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowStrong: 'rgba(0, 0, 0, 0.15)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },
  
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    medium: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};

export type Theme = typeof theme; 