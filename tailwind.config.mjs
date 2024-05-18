/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

import colors from './src/data/colors/colors.mjs';

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
        checkCircle: 'url("/src/img/check-circle.svg")',
        checkCircleWhite: 'url("/src/img/check-circle--white.svg")',
        envelope: 'url("/src/img/envelope-outline.svg")',
        envelopeWhite: 'url("/src/img/envelope-outline--white.svg")',
        fb: 'url("/src/img/fa-fb.svg")',
        fbWhite: 'url("/src/img/fa-fb--white.svg")',
        ig: 'url("/src/img/fa-ig.svg")',
        igWhite: 'url("/src/img/fa-ig--white.svg")',
        location: 'url("/src/img/map-pin-outline.svg")',
        locationWhite: 'url("/src/img/map-pin-outline--white.svg")',
        phone: 'url("/src/img/phone-outline.svg")',
        phoneWhite: 'url("/src/img/phone-outline--white.svg")',
        redYellowGradient: `linear-gradient(
          320deg,
          hsl(356deg 74% 52%) 0%,
          hsl(8deg 75% 55%) 2%,
          hsl(16deg 78% 56%) 7%,
          hsl(22deg 80% 57%) 17%,
          hsl(27deg 83% 58%) 32%,
          hsl(31deg 86% 59%) 48%,
          hsl(35deg 89% 60%) 63%,
          hsl(38deg 92% 60%) 76%,
          hsl(41deg 95% 61%) 89%,
          hsl(44deg 98% 62%) 100%
        )`
      }
    }
  },
  plugins: []
};
