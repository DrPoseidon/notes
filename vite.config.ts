import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

import { resolve } from 'node:path'
import VueTypeImports from 'vite-plugin-vue-type-imports'

export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }
  const base = env.NODE_ENV === 'production' ? '/notes/' : '/'

  return {
    base: env.NODE_ENV === 'production' ? '/notes/' : '/',
    plugins: [vue(), svgLoader(), VueTypeImports()],
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: (chunkInfo) => {
            if (chunkInfo.facadeModuleId.includes('.svg')) {
              return 'assets/icons/[name]-[hash].js'
            }
            return '[name]-[hash].js'
          }
        }
      }
    },
    server: {
      open: base,
      port: 8080
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
