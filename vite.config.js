import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Use the repository subpath only for the GitHub Pages production build.
  base: process.env.GITHUB_ACTIONS === 'true' ? '/celebrare-photo-gallery/' : '/',
  plugins: [react()],
})
