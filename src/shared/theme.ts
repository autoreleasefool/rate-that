import {createTheme} from '@shopify/restyle';

const palette = {
  blue: '#055C9D',
  darkBlue: '#003060',
  lightBlue: '#0E86D4',

  green: '#478C5C',
  darkGreen: '#013A20',
  lightGreen: '#BACC81',

  black: '#000000',
  blackTransparent: 'rgba(0, 0, 0, 0.5)',
  white: '#FFFFFF',
  whiteTransparent: 'rgba(255, 255, 255, 0.7)',
};

export const theme = createTheme({
  colors: {
    primary: palette.lightBlue,
    secondary: palette.lightGreen,

    background: palette.white,
    cardBackground: palette.white,

    textPrimary: palette.black,
    textPrimaryContrasting: palette.white,
    textSecondary: palette.blackTransparent,
    textSecondaryContrasting: palette.whiteTransparent,

    shadow: palette.black,
    divider: palette.black,
  },
  spacing: {
    extraSmall: 4,
    small: 8,
    standard: 16,
    large: 24,
    extraLarge: 40,
  },
  borderRadii: {
    standard: 4,
    large: 8,
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

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,

    primary: palette.blue,
    secondary: palette.green,

    background: palette.black,
    cardBackground: palette.black,

    textPrimary: palette.white,
    textPrimaryContrasting: palette.black,
    textSecondary: palette.whiteTransparent,
    textSecondaryContrasting: palette.blackTransparent,

    divider: palette.white,
  },
};
