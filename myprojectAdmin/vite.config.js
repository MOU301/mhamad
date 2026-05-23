import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: 'admin.foryou.local',
    port: 5174,
    strictPort: true,
    cors: {
       origin: ['http://foryou.local', 'http://admin.foryou.local', 'http://super.foryou.local'],
      credentials: true
    },
    hmr: {
      protocol: 'ws',
      host: 'admin.foryou.local',
      port: 5174
    },
  }
})
