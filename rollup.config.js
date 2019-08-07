import includePaths from "rollup-plugin-includepaths";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
//import scss from 'rollup-plugin-scss';
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
//import svgr from '@svgr/rollup';
import { terser } from "rollup-plugin-terser";
import strip from "rollup-plugin-strip";
import copy from "rollup-plugin-copy";
import ignore from 'rollup-plugin-ignore';

import pkg from "./package.json";
import sizes from "./rollup-plugins/sizes-plugin";

let isClassComponent = process.env.classComponent === "true";

const input = isClassComponent
  ? "components/collapse/Collapse.class.jsx" // React 16.3+
  : "components/collapse/Collapse.jsx"; // React 16.8+
const name = "Collapse";

let includePathOptions = {
  include: {},
  paths: ["./", "src"],
  external: [],
  extensions: [".js", ".jsx", ".css", ".scss", ".json", ".html"]
};

let isEs5 = process.env.ES5 === "true";
let isEs6 = process.env.ES6 === "true";
isEs5 && console.log("*** ES5 ***");
isEs6 && console.log("*** ES2015 ***");
isClassComponent && console.log("*** CLASS COMPONENT ***");
!isClassComponent && console.log("*** FUNCTION COMPONENT ***");

export default {
  external: ["react", "react-dom"],

  input,

  output: [
    (isEs5 || isEs6) && {
      file: isEs5 ? pkg.main : pkg["main-es2015"],
      format: "umd",
      name,
      sourcemap: true,
      externalLiveBindings: false,
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      }
    },
    0 && {
      file: pkg.cjs,
      format: "cjs",
      sourcemap: true
    },
    0 && {
      file: pkg.module,
      format: "es",
      sourcemap: true
    },
    0 && {
      file: pkg.iife,
      format: "iife",
      name,
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDOM"
      }
    }
  ].filter(Boolean),
  plugins: [
    includePaths(includePathOptions),
    ignore([]),
    //scss(),
    postcss({
      inject: false,
      extract: isEs5, // creating file
      plugins: [],
      minimize: true
      //sourceMap: 'inline',
    }),
    external({
      includeDependencies: false
    }),

    strip({
      debugger: true,
      functions: ["console.log", "console.warn", "debugLog", "debug.trace"],
      sourceMap: true
    }),
    url({}),
    //svgr(),
    resolve(),
    babel({
      babelrc: true,
      presets: [
        isEs6 && [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              node: "6.5" /* ES2016 compilation target */
            }
          }
        ]
      ].filter(Boolean),
      exclude: "node_modules/**"
    }),
    commonjs(),
    terser({
      compress: { drop_console: true }
    }),
    sizes({
      getSize: (size, gzip, filename) => {
        console.log("minified", size, filename);
        console.log("gzip minified", gzip);
      }
    }),
    copy({
      targets: [
        { src: "types/index.d.ts", dest: "dist", rename: "Collapse.umd.d.ts" }
      ]
    })
  ].filter(Boolean)
};
