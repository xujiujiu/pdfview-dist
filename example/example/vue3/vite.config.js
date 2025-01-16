import { fileURLToPath, URL } from 'node:url'
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: './',
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',
  base: './',
  server: {
    hmr: {
      overlay: false
    },
    // 支持外部文件
    fs: {
      strict: false
    }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['pdf-view'].includes(tag),
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'pdfview': path.join(__dirname, '../../')
    }
  },
  optimizeDeps: {
    force: true,
    // include: ['pdf-view'],
    // exclude: ['pdf-view'],
    holdUntilCrawlEnd: false
  }
})
