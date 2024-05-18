import theme from './theme.mjs';

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  _black: theme.black,
  black: theme.black[400],
  blackest: theme.black[100],
  _white: theme.ghost_white,
  white: theme.ghost_white[600],
  whitest: '#fff',
  gray: theme.platinum1,
  'gray-light': theme.black[800],
  'gray-dark': theme.black[600],
  red: theme.poppy,
  'red-light': theme.poppy[800],
  'red-dark': theme.poppy[300],
  yellow: theme.sunglow,
  'yellow-light': theme.sunglow[800],
  'yellow-dark': theme.sunglow[200],
  _blue: theme.blue,
  blue: theme.blue[400],
  'blue-light': theme.blue[500],
  'blue-dark': theme.blue[300],
  // dark mode variants
  dmBlack: '#23262f', // via Astro docs nav
  dmWhite: theme.ghost_white[800],
  dmGray: theme.platinum1[200]
};

export default colors;
