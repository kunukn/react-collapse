{
  const polyfill = self.React ? self.React.createElement : () => {} // React must be loaded and added to globalThis.React
  self.ReactJsxRuntime = {
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

{
  let Collapse = () => 'loading...' // Temp assignment.

  let s = document.getElementById('libscript')
  s.onload = function () {
    Collapse = self.Collapse.Collapse // No longer default exports, so like this.
    // Render once we are ready.
    const root = self.ReactDOM.createRoot(document.getElementById('root'))
    root.render(<MyComponent />)
  }
  // Lazy loaded to ensure window.ReactJsxRuntime polyfill has been applied.
  s.src =
    'https://unpkg.com/@kunukn/react-collapse@3.0.11/dist/react-collapse.umd.js'

  // eslint-disable-next-line
  function MyComponent() {
    const [isOpen, setIsOpen] = self.React.useState(true)
    const onToggle = () => setIsOpen((s) => !s)

    return (
      <div className="my-component">
        <button onClick={onToggle}> Toggle global </button>
        <Collapse
          isOpen={isOpen}
          transition="height 300ms cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <p> Hello world </p>
          <p> How are you? </p>
        </Collapse>
      </div>
    )
  }
}
