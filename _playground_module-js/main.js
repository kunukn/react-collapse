import { Collapse } from 'script-module-importmap-react-collapse'
import React from 'react'
import ReactDOM from 'react-dom'

// import { Collapse } from 'dist-react-collapse'

console.log('main.js')

console.log(Collapse)

function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(true)
  const onToggle = () => setIsOpen((s) => !s)

  return (
    <div className="my-component">
      <button onClick={onToggle}> Toggle module </button>
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

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<MyComponent />)
