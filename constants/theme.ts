import { hexToRgba } from './utils';

export const Colors = {
  /** =====================
   *  ACCENT COLORS
   *  ===================== */
  accent: {
    blue: {
      100: '#AEC6DA',
      200: '#5C8CB5',
      300: '#4979A1',
      400: '#2F4D67',
    },
    orange: {
      100: '#E0B480',
      200: '#C38030',
      300: '#9B6626',
      400: '#583A16',
    },
  },

  /** =====================
   *  BACKGROUND COLORS
   *  ===================== */
  background: {
    blue: {
      100: '#D2E0E6',
      200: '#B6CDD7',
      300: '#749FB2',
      400: '#3D5F6E',
    },
    cream: {
      100: '#F5EFE8',
      200: '#E7D8C7',
      300: '#C5A279',
      400: '#815F38',
    },
    yellow: {
      100: '#F6EBAB',
      200: '#F2E286',
      300: '#E9CD2F',
      400: '#948010',
    },
  },

  /** =====================
   *  CTA / CORE
   *  ===================== */
  cta: {
    black: {
      100: '#BDBDBD',
      200: '#808080',
      300: '#424242',
      400: '#131313',
      500: '#000000',
    },
  },

  /** =====================
   *  EXTENDED COLORS
   *  ===================== */
  extended: {
    gold: {
      100: '#FFE2B7',
      200: '#FEC570',
      300: '#FEB03B',
      400: '#C27501',
    },
    green: {
      100: '#A1AD98',
      200: '#616E58',
      300: '#454E3E',
      400: '#292E25',
    },
  },

  /** =====================
   *  NEUTRALS
   *  ===================== */
  neutrals: {
    100: '#FFFFFF',
    200: '#E5E5E5',
    300: '#CCCCCC',
    400: '#B3B3B3',
    500: '#999999',
    600: '#808080',
    700: '#666666',
    800: '#4D4D4D',
    900: '#333333',
  },

  /** =====================
   *  SEMANTIC
   *  ===================== */
  semantic: {
    green: {
      100: '#BFF5D8',
      200: '#48E290',
      300: '#1FC16B',
      400: '#189552',
    },
    red: {
      100: '#FEB3BA',
      200: '#DE2031',
      300: '#CC1222',
      400: '#A10311',
    },
    yellow: {
      100: '#FFE67A',
      200: '#FFDB43',
      300: '#D1A900',
      400: '#705B00',
    },
  },

  /** =====================
   *  TEXT COLORS
   *  ===================== */
  text: {
    brown: {
      100: '#DFB27A',
      200: '#A66F28',
      300: '#483012',
      400: '#211608',
    },
  },

  /** =====================
   *  APP-LEVEL ALIASES
   *  ===================== */
  backgrounds: {
    welcome: '#211608',
    normal: '#FFFFFF',
    gradient: ['#D2E0E6', '#F6EBAB'] as const,
  },

  fonts: {
    heading: '#211608',
    body: hexToRgba('#211608', 0.7),
    buttonPrimary: '#FFFFFF',
    buttonSecondary: '#000000',
    blue: '#5C8CB5',
    brown: '#9B6626',
    red: '#DE2031',
  },

  components: {
    buttonPrimary: '#000000',
    buttonSecondary: '#000000',
    activeInput: '#9B6626',
  },
};

export const Typography = {
  h1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    lineHeight: 36,
  },
  h2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 28,
    lineHeight: 32,
  },
  h3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 28,
  },
  h4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 24,
  },
  h5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 20,
  },
  b1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
  b2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
  },
  b2Regular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  b3: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    lineHeight: 14,
  },
  l1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 14,
  },
  l2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 8,
    lineHeight: 11,
  },
  l3: {
    fontFamily: 'Poppins-Regular',
    fontSize: 6,
    lineHeight: 9,
  },
};
