import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      // Tell @astrojs/tailwind to not inject default `base.css` on every page
      // so we can define and import our own custom `base.css`.
      applyBaseStyles: false,
      // Apply the tailwindcss/nesting postcss plugin.
      nesting: true
    })
  ]
});
