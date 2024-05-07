import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: 'node_modules/.cacheDir',
  plugins: [
    vue(),
    vueJsx(),
    federation({
      name: "remoteVue3App",
      filename: "remoteEntry.js",
      remotes: {
        "host-app": {
          external: '/',
          externalType: "url",
          format: 'esm',
          from:'webpack'
        }
      },
      // Modules to expose
      exposes: {
        // "./NotAButton": "./src/mount",
        "./NotAButton": {
          name: "'button",
          import: "./src/components/NotAButton.vue"
        },
      },
      shared: ['vue']
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        format: 'esm',
        entryFileNames: 'assets/[name].js',
        minifyInternalExports: false
      }
    },
    outDir: "../host-app/dist/remoteVue3App"
  }
})
