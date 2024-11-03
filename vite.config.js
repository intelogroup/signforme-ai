import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx']
      }
    })
  ],
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
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
    outDir: 'dist',
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
