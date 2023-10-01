import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import { resolve } from 'node:path'
import VueTypeImports from 'vite-plugin-vue-type-imports'

export default defineConfig({
  plugins: [vue(), svgLoader(), VueTypeImports()],
  server: {
    open: '/',
    port: 8080
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
