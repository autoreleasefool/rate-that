import {createTheme} from '@shopify/restyle';

const palette = {
  ivory: '#D7D4DD',
  periwinkle: '#838BC2',
  purple: '#715C8C',
  darkBlue: '#333F63',

  black: '#000000',
  blackTransparent: 'rgba(0, 0, 0, 0.5)',
  white: '#FFFFFF',
  whiteTransparent: 'rgba(255, 255, 255, 0.7)',
};

export const theme = createTheme({
  colors: {
    primary: palette.periwinkle,
    seconday: palette.purple,
    background: palette.darkBlue,
    cardBackground: palette.purple,

    textPrimary: palette.black,
    // textPrimaryContrasting: palette.white,
    textSecondary: palette.blackTransparent,
    // textSecondaryContrasting: palette.whiteTransparent,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 32,
      color: 'textPrimary',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 24,
      color: 'textPrimary',
    },
    body: {
      fontSize: 16,
      color: 'textPrimary',
    },
    bodySecondary: {
      fontSize: 16,
      color: 'textSecondary',
    },
    caption: {
      fontSize: 12,
      color: 'textPrimary',
    },
    captionSecondary: {
      fontSize: 12,
      color: 'textSecondary',
    },
  },
});

export type Theme = typeof theme;
