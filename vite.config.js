import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // 👈 allows access from Docker host
    port: 5173,        // same port you exposed in Dockerfile
    strictPort: true,  // ensures it won’t auto-switch ports
    watch: {
      usePolling: true, // 👈 useful for Docker file change detection
    },
  },
})
