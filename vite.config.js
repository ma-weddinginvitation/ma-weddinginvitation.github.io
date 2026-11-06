import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site from /<repository-name>/.
  base: '/ma-weddinginvitation/',
  build: {
    // The textures are small and tile, so keep them as files rather than inlining them.
    assetsInlineLimit: 2048,
  },
})
