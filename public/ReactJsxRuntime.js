;((R, g) => {
  let polyfill = R ? R.createElement : () => {}
  g.ReactJsxRuntime = {
    /*
      Polyfill the missing UMD required from the Collapse library.
      Some other libraries seems to use jsxRuntime. I used ReactJsxRuntime for my library.
    */

    jsx: polyfill,
    jsxs: polyfill,
    jsxDEV: polyfill,
    jsxsDEV: polyfill,
  }
})(React, globalThis)
