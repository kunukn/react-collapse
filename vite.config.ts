import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: true,
    lib: {
      entry: resolve(__dirname, 'lib/Collapse.tsx'),
      name: 'Collapse',
    },
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      input: resolve(__dirname, 'lib/Collapse.tsx'),
      plugins: [],
      output: [
        {
          dir: 'dist',
          entryFileNames: '[name].es.js',
          format: 'es',
        },
        {
          dir: 'dist',
          entryFileNames: '[name].umd.js',
          format: 'umd',
          name: 'Collapse',
          externalLiveBindings: false,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      ],
    },
  },
})
