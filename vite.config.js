import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset paths, so renaming the repository can never break the site's files.
  base: './',
  build: {
    // The textures are small and tile, so keep them as files rather than inlining them.
    assetsInlineLimit: 2048,
  },
})
