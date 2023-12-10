import { defineConfig, presetIcons, presetUno } from "unocss"
import presetAnimations from "unocss-preset-animations"
import { presetShadcn } from "unocss-preset-shadcn"

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,ts,jsx,tsx,vue,svelte,astro}"],
  },
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.3,
    }),
    presetAnimations(),
    presetShadcn({
      color: "neutral",
    }),
  ],
})
