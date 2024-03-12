/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

import colors from './src/colors/colors.mjs';

export default {
  content: ['./src/**/*.{astro,html,md,mdx,svg}'],
  theme: {
    screens: {
      xxs: '320px',
      xs: '475px',
      ...defaultTheme.screens
    },
    colors,
    extend: {
      backgroundImage: {
        envelope: 'url("/src/img/envelope-outline.svg")',
        envelopeWhite: 'url("/src/img/envelope-outline--white.svg")',
        fb: 'url("/src/img/fa-fb.svg")',
        fbWhite: 'url("/src/img/fa-fb--white.svg")',
        ig: 'url("/src/img/fa-ig.svg")',
        igWhite: 'url("/src/img/fa-ig--white.svg")',
        location: 'url("/src/img/map-pin-outline.svg")',
        locationWhite: 'url("/src/img/map-pin-outline--white.svg")',
        phone: 'url("/src/img/phone-outline.svg")',
        phoneWhite: 'url("/src/img/phone-outline--white.svg")'
      }
    }
  },
  plugins: []
};
