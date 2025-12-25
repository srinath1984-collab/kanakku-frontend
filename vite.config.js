import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
    host: '0.0.0.0',
    strictPort: true,
  },
  server: {
    port: 8080,
    host: '0.0.0.0',
  }
})
