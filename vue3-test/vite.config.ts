import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: "remoteVue3App",
      filename: "remoteEntry.js",
      // Modules to expose
      exposes: {
        "./NotAButton": "./src/mount",
        // "./NotAButton": "./src/components/NotAButton.vue",
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: "esnext"
  }
})
