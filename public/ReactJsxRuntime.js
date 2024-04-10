{
  const polyfill = React ? React.createElement : () => {} // React must be loaded and added to globalThis.React
  globalThis.ReactJsxRuntime = {
    /*
      Polyfill the missing UMD required from the Collapse library.
      Some other libraries seems to use jsxRuntime. I used ReactJsxRuntime for my library.
    */
   
    jsx: polyfill,
    jsxs: polyfill,
    jsxDEV: polyfill,
    jsxsDEV: polyfill,
  }
}
