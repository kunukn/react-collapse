import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';
let input = 'src/components/Collapse/Collapse.jsx'; // React 16.3+
//let input = 'src/components/Collapse/Collapse.hooks.jsx'; // React 16.8+

export default {
  external: ['react', 'react-dom'],

  input,

  output: [
    1 && {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    1 && {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
    2 && {
      file: pkg.iife,
      format: 'iife',
      name: 'Collapse',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    3 && {
      file: pkg.umd,
      format: 'umd',
      name: 'Collapse',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ].filter(Boolean),
  plugins: [
    scss(),
    postcss({
      plugins: [],
      minimize: true,
      //sourceMap: 'inline',
    }),
    external({
      includeDependencies: false,
    }),
    url(),
    svgr(),
    resolve(),
    babel({
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        //'@babel/plugin-proposal-optional-chaining',
        //'@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        //'transform-react-remove-prop-types',
      ],
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
};
