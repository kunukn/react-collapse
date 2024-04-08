import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import removeConsole from 'vite-plugin-remove-console'
import { resolve } from 'path'

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [
    react(),
    removeConsole({ includes: ['log', 'warn', 'error', 'info'] }),
  ],
  build: {
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Collapse',
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => {
        switch (format) {
          case 'es':
            return 'react-collapse.mjs'
          case 'umd':
            return 'react-collapse.umd.js'
          case 'cjs':
            return 'react-collapse.cjs'
          default:
            throw new Error('Build file unknown format ' + format)
        }
      },
    },
    sourcemap: true,
    rollupOptions: {
      /*
       Make sure to externalize deps that shouldn't be bundled
       into your library
      */
      external: ['react', 'react/jsx-runtime'],

      output: {
        /*
         Provide global variables to use in the UMD build
         for externalized deps
        */
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          /*
           Made up, probably don't exists as CDN or UMD anywhere. If needed, then a polyfill for ReactJsxRuntime or something is needed.
           Please use ES Modules in the browser or build tools when using this Collapse library.
           https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
          */
          'react/jsx-runtime': 'ReactJsxRuntime',
        },
      },
    },
  },
})
