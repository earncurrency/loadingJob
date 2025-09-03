import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),

  ],
  base: process.env.NODE_ENV === 'production' ? '/loadingJob/' : '',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    // __API_URL__: JSON.stringify(
    //   process.env.NODE_ENV === 'production'
    //     ? 'http://192.168.1.15:8000/'
    //     : 'http://127.0.0.1:8000/'
    // ),
    __AUTH_URL__: JSON.stringify(
      process.env.NODE_ENV === "production"
      ? "https://app.asiagroup1999.co.th/app/hr/employee?"
      : "https://app.asiagroup1999.co.th/app/hr/employee?"
    ),

    // __IMG_PROFILE_URL__: JSON.stringify(
    //   process.env.NODE_ENV === 'production'
    //     ? 'http://192.168.1.15/CRM/uploads/profile/'
    //     : 'http://localhost:5173/uploads/profile/'
    // ),

    __IMG_ICON__: JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? '/'
        : '/'
    ),
  }
})
