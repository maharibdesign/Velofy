// astro.config.mjs

import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  integrations: [tailwind()],
  adapter: vercel({
    webAnalytics: {
        enabled: true, // This enables Vercel's built-in analytics
    }
  })
});