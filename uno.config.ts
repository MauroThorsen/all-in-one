// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import icons from '@unocss/preset-icons'
export default defineConfig({
  presets: [
    icons({
      // Other options
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block'
      }
    }),
    presetUno()
  ],
})
