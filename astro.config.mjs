// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import vue from '@astrojs/vue'

// https://astro.build/config
export default defineConfig({
  site: process.env.ASTRO_SITE,
  base: process.env.ASTRO_BASE,
  fonts: [
    {
      name: "VCR OSD Mono",
      cssVariable: "--font-vcr",
      provider: fontProviders.local(),
      options: {
        variants: [{
          src: ['./src/assets/fonts/VCR_OSD_MONO_1.001.ttf'],
          weight: 'normal',
          style: 'normal'
        }]
      },
      fallbacks: ["VT323", "ui-monospace", "monospace"],
      optimizedFallbacks: false
    },
    {
      name: "Space Mono",
      cssVariable: "--font-space-mono",
      provider: fontProviders.google(),
      styles: ["normal"],
      fallbacks: ["ui-monospace", "monospace"],
      optimizedFallbacks: false
    }
  ],
  integrations: [vue()]
})