import { Collapse } from '../lib/Collapse'
import React from 'react'

export default function MyComponent() {
  const [isOpen, setIsOpen] = React.useState(false)
  const onToggle = () => setIsOpen((s) => !s)

  return (
    <div className="my-component">
      <button onClick={onToggle}> Toggle </button>
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
