let Collapse = () => 'loading...' // Temp assignment.

let collapseScript = document.getElementById('libscript')
collapseScript.onload = function () {
  Collapse = self.Collapse.Collapse // No longer default exports, so like this.
  // Render once we are ready.
  const root = self.ReactDOM.createRoot(document.getElementById('root'))
  root.render(<MyComponent />)
}

let jsxScript = document.getElementById('lib_jsx_runtime')
jsxScript.onload = function () {
  // Lazy loaded to ensure ReactJsxRuntime polyfill has been applied.
  collapseScript.src =
    'https://unpkg.com/@kunukn/react-collapse@3.0.14/dist/react-collapse.umd.js'
}

// Run this after onload has been defined.
jsxScript.src =
  'https://unpkg.com/@kunukn/react-collapse@3.0.14/dist/ReactJsxRuntime.js'

function MyComponent() {
  const [isOpen, setIsOpen] = self.React.useState(true)
  const onToggle = () => setIsOpen((s) => !s)

  return (
    <div className="my-component">
      <button onClick={onToggle}> Toggle global </button>
      <Collapse
        isOpen={isOpen}
        transition="height 320ms cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <p> Hello world </p>
        <p> How are you today? </p>
      </Collapse>
    </div>
  )
}
