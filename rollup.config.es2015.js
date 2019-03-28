import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
import sizes from './rollup-plugins/sizes-plugin';

//const input = 'components/Collapse/Collapse.jsx'; // React 16.3+
const input = 'components/Collapse/Collapse.hooks.jsx'; // React 16.8+
const name = 'Collapse';

let includePathOptions = {
  include: {},
  paths: ['./', 'src'],
  external: [],
  extensions: ['.js', '.jsx', '.css', '.scss', '.json', '.html'],
};

export default {
  external: ['react', 'react-dom'],

  input,

  output: [
    0 && {
      file: pkg.main,
      format: 'umd',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    1 && {
      file: pkg['main-es2015'],
      format: 'umd',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    0 && {
      file: pkg.cjs,
      format: 'cjs',
      sourcemap: true,
    },
    0 && {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    0 && {
      file: pkg.iife,
      format: 'iife',
      name: name,
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ].filter(Boolean),
  plugins: [
    includePaths(includePathOptions),
    postcss({
      inject: false,
      extract: true, // create css file
      plugins: [],
      minimize: true,
      //sourceMap: 'inline',
    }),
    external({
      includeDependencies: false,
    }),
    url(),
    resolve(),
    babel({
      babelrc: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: '6.5' /* ES2016 compilation target */,
            },
          },
        ],
        '@babel/preset-react',
      ],
    }),
    commonjs(),
    terser({
      compress: { drop_console: true },
    }),
    sizes({
      getSize: (size, gzip, filename) => {
        console.log('minified', size, filename);
        console.log('gzip minified', gzip);
      },
    }),
  ].filter(Boolean),
};
