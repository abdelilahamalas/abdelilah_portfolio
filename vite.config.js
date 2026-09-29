import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/abdelilah_portfolio/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        timeout: 60000,
        proxyTimeout: 60000,
      },
      '/storage': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        timeout: 60000,
        proxyTimeout: 60000,
      },
      '/cv-download': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cv-download/, '/ABDELILAH_AMALAS_CV.pdf'),
        timeout: 60000,
        proxyTimeout: 60000,
      },
    },
  },
})
