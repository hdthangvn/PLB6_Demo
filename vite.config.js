import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // Cho phép external connections
    open: true, // Tự động mở browser
    hmr: {
      overlay: false // Tắt error overlay nếu cần
    }
  },
  preview: {
    port: 4173,
    host: true
  }
})
