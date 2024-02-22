/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

import colors from './src/colors/colors.mjs';

export default {
  content: ['./src/**/*.{astro,html,md,svg}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '475px',
      ...defaultTheme.screens
    },
    colors,
    extend: {}
  },
  plugins: []
};
