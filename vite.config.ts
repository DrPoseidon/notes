import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import svgLoader from 'vite-svg-loader'

export default ({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, process.cwd(), '') }

  // production mode
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isProd = env.NODE_ENV === 'production'

  return defineConfig({
    base: isProd ? '/notes/' : '/',
    build: {
      assetsDir: '',
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // SVG
            if (id.includes('.svg')) {
              return 'icons/sprites'
            }

            return 'index'
          },
          assetFileNames: (assetInfo) => {
            // IMAGES
            if (assetInfo.name?.match(/\.(png|jpe?g|svg)(\?.*)?$/)) {
              return 'img/[name]-[hash:8].[ext]'
            }

            // CSS
            if (assetInfo.name?.includes('.css')) {
              return 'css/[name]-[hash:8].[ext]'
            }

            return '[name].[ext]'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'src')
      }
    },
    server: {
      open: '/',
      port: 8080
    },
    envDir: resolve(__dirname, 'config', 'env'),
    plugins: [
      vue(),
      VueTypeImports(),
      svgLoader({
        svgoConfig: {
          multipass: true,
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  // viewBox is required to resize SVGs with CSS.
                  // @see https://github.com/svg/svgo/issues/1128
                  removeViewBox: false
                }
              }
            }
          ]
        }
      })
    ]
  })
}
