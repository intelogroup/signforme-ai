import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic',
    jsxImportSource: 'react'
  })],
  server: {
    port: 4000
  },
  optimizeDeps: {
    force: true,
    include: [
      'react',
      'react-dom',
      '@heroicons/react/24/outline'
    ]
  },
  build: {
    commonjsOptions: {
      include: []
    },
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          'heroicons': ['@heroicons/react/24/outline']
        }
      }
    }
  }
})
