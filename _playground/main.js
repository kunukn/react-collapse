import { Collapse } from "react-collapse";
import React from 'react';
import ReactDOM from 'react-dom';

console.log("main.js");

console.log(Collapse);

console.log(React);

console.log(ReactDOM);

const e = React.createElement;

function MyComponent() {
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyComponent />);