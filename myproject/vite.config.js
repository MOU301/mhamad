import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: '/',                // يفضل "/" بدل "./" لتجنب مشاكل المسارات عند البروكسي
  plugins: [react(),tailwindcss()],
  server: {
    host: 'foryou.local',   // كما هو
    port: 5173,             // كما هو
    strictPort: true,       // يضمن عدم الانتباه إلى بورت غير متوفر
    cors: {                 // تفعيل CORS من الڤيت للتأكد من السماح للكوكيز
       origin: ['http://foryou.local', 'http://admin.foryou.local', 'http://super.foryou.local'],
      credentials: true
    },
    hmr: {                  // ضبط HMR للعمل تحت دومينك الخاص
      protocol: 'ws',
      host: 'foryou.local',
      port: 5173
    },
  }
})

