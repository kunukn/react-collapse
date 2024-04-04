import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import strip from 'rollup-plugin-strip'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Collapse',
      fileName: 'react-collapse',
    },
    sourcemap: true,
    rollupOptions: {
      plugins: [
        strip({
          debugger: true,
          functions: ['console.log', 'console.warn', 'debugLog', 'debug.trace'],
          sourceMap: true,
        }),
      ],

      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
