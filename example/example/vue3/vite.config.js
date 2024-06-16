import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  base: './',
  plugins: [
    vue(),
  ],
  server: {
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'pdfview': path.join(__dirname, '../../dist/index.js')
    }
  }
})
