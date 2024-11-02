import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000
  },
  optimizeDeps: {
    force: true
  },
  build: {
    commonjsOptions: {
      include: []
    }
  }
})
