# react-collapse

Collapse component with CSS transition for elements with variable and dynamic height.

[![npm version](https://img.shields.io/npm/v/@kunukn/react-collapse.svg?style=flat-square)](https://www.npmjs.com/package/@kunukn/react-collapse)
[![npm downloads](https://img.shields.io/npm/dm/@kunukn/react-collapse.svg?style=flat-square)](https://www.npmjs.com/package/@kunukn/react-collapse)
[![gzip](https://img.shields.io/bundlephobia/minzip/@kunukn/react-collapse.svg)](https://bundlephobia.com/result?p=@kunukn/react-collapse)
[![license](https://img.shields.io/github/license/kunukn/react-collapse.svg)](https://github.com/kunukn/react-collapse/blob/master/LICENSE)

react-collapse

![logo](logo/collapse.svg 'logo')

# Demo

- <a href="https://codepen.io/kunukn/full/ebMryW" target="_blank">simple - codepen</a>

- <a href="https://codepen.io/kunukn/full/xmjRNo" target="_blank">accordion - codepen</a>

- <a href="https://codepen.io/kunukn/full/JwmEYL" target="_blank">read more - codepen</a>

- <a href="https://stackblitz.com/edit/vitejs-vite-qfvnck" target="_blank">simple - edit stackblitz</a>

- <a href="https://codesandbox.io/s/k1439yw2v5" target="_blank">codesandbox - collapsibles</a>

- <a href="https://codesandbox.io/s/react-collapse-expand-all-collapse-all-0h4mc">codesandbox expand-all</a>

- <a href="https://codesandbox.io/s/collapse-with-emotion-css-prototype-euqy2">codesandbox CSS-in-JS integration example</a>

- <a href="https://kunukn.github.io/react-collapse" target="_blank">view storybook</a>

# CSS required

:warning: ️You need to add style (transition) in your own stylesheet to add animation. Here is an example.

```html
<style>
  .collapse-css-transition {
    transition: height 280ms cubic-bezier(0.4, 0, 0.2, 1);
  }
</style>
```

Alternatively, you can add it using the `transition` prop.

## Installation for React 16.8+

- UMD minified ~2.3 kb, gzipped ~1.1 kb
- Module minified ~2.9 kb, gzipped ~1.1 kb
- CJS minified ~2.0 kb, gzipped ~1.0 kb

```bash
npm i -D @kunukn/react-collapse
# or
# yarn add -D @kunukn/react-collapse
```

## Installation for React 16.3+

Avoid it if possible. This is no longer maintained.

- UMD minified ~5.8 kb, gzipped ~2.1 kb

```bash
npm i -D @kunukn/react-collapse@^1
# or
# yarn add -D @kunukn/react-collapse@^1
```

Minimal toggle content component example.

```jsx
// Notice how you import it, changed since ver 3.
import { Collapse } from '@kunukn/react-collapse'
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
      </Collapse>
    </div>
  )
}
```

```jsx
// The possible imports

import { Collapse } from '@kunukn/react-collapse' // UMD
import '@kunukn/react-collapse/dist/react-collapse.css' // CSS
import type { CollapseProps } from '@kunukn/react-collapse/dist/react-collapse.d.ts' // TS
const { Collapse } = require('@kunukn/react-collapse/dist/react-collapse.cjs') // CommonJS
```

## Properties

| Prop               | Type             | Default                 |
| ------------------ | ---------------- | ----------------------- |
| isOpen             | boolean          | false                   |
| children           | node \| function |                         |
| render             | function         |                         |
| className          | string           | collapse-css-transition |
| transition         | string           |                         |
| elementType        | string           | div                     |
| collapseHeight     | string           | 0px                     |
| onChange           | function         |                         |
| onInit             | function         |                         |
| addState           | boolean          | false                   |
| noAnim             | boolean          | false                   |
| overflowOnExpanded | boolean          | false                   |

<br>

#### `isOpen` : boolean

Expands or collapses content.

#### `children` : node | function

Render the children.

```jsx
const MyComponent = ({ isOpen }) => (
  <Collapse isOpen={isOpen}>
    <p>Paragraph of text.</p>
    <p>Another paragraph is also OK.</p>
    <p>Images and any other content are ok too.</p>
    <img src="cutecat.gif" />
  </Collapse>
)
```

Render content using the [render-props pattern](https://reactjs.org/docs/render-props.html).

```jsx
const MyComponent = ({ isOpen }) => (
  <Collapse isOpen={isOpen}>
    {(state) => (
      <div className={`using-collapse-state-to-add-css-class ${state}`}>
        <p>I know the collapse state: {state}</p>
      </div>
    )}
  </Collapse>
)
```

#### `render` : function

Render content using the render-props pattern.

```jsx
const MyComponent = ({ isOpen }) => {
  const render = (state) => (
    <div className={`using-collapse-state-to-add-css-class ${state}`}>
      <p>I know the collapse state: {state}</p>
    </div>
  )
  return <Collapse isOpen={isOpen} render={render} />
}
```

There are four possible collapse states: `collapsed`, `collapsing`, `expanded`, `expanding`.

#### `className` : string

You can specify a custom className. The default value is `collapse-css-transition`. Remember to add CSS transition if a className is provided.

#### `transition` : string

You can also specify a CSS transition inline by using the `transition` prop.

```jsx
const MyComponent = ({ isOpen, duration = '290ms' }) => (
  <Collapse
    transition={`height ${duration} cubic-bezier(.4, 0, .2, 1)`}
    isOpen={isOpen}
  >
    <p>Paragraph of text</p>
  </Collapse>
)
```

#### `elementType` : string

You can specify the HTML element type for the collapse component. By default, the element type is a `div` element.

```jsx
const MyComponent = ({ isOpen }) => (
  <Collapse elementType="article" isOpen={isOpen}>
    <p>Paragraph of text inside an article element</p>
  </Collapse>
)
```

#### `collapseHeight` : string

You can specify the collapse height in CSS unit to partially show some content.

```jsx
const MyComponent = ({ isOpen }) => (
  <Collapse collapseHeight="40px" isOpen={isOpen}>
    <p>A long paragraph of text inside an article element</p>
  </Collapse>
)
```

#### `onChange` : function

Callback function for when the transition changes.

```jsx
const MyComponent = ({ isOpen }) => {
  const onChange = ({ state, style }) => {
    /*
    state: string = the state of the collapse component.
    style: object = styles that are applied to the component.
  */
  }

  return (
    <Collapse onChange={onChange} isOpen={isOpen}>
      <p>A long paragraph of text inside an article element</p>
    </Collapse>
  )
}
```

#### `onInit` : function

Similar to onChange but only invoked on DOM mounted.<br/>
This is an example that starts collapsed and expands on mount.

```jsx
const MyComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const onInit = ({ state, style, node }) => {
    /*
       node: HTMLElement = the DOM node of the component.
    */

    setIsOpen(true)
  }

  return (
    <div>
      <button onClick={() => setIsOpen((state) => !state)}> Toggle </button>
      <Collapse onInit={onInit} isOpen={isOpen}>
        <p>A long paragraph of text inside an article element</p>
      </Collapse>
    </div>
  )
}
```

#### `addState` : boolean

If added, then one of the class names will be appended to the component depending on the state.

```
--c-collapsed
--c-collapsing
--c-expanded
--c-expanding
```

#### `noAnim` : boolean

If added, then there will be no collapse animation. State changes between `collapsed` and `expanded`.

#### `overflowOnExpanded` : boolean

If added, then `overflow: hidden` style will not be added when the state is `expanded`.

#### Custom props

`Collapse` applies custom props such as `aria-` and `data-` attributes to the component's rendered DOM element. For example, this can be used to set the `aria-hidden` attribute:

```jsx
const MyComponent = ({ isOpen }) => (
  <Collapse aria-hidden={isOpen ? 'false' : 'true'} isOpen={isOpen}>
    <p>Paragraph of text</p>
  </Collapse>
)
```

Or you could specify a specific transitionDuration.

```jsx
const collapseStyles = { transitionDuration: '270ms' }

const MyComponent = ({ isOpen }) => (
  <Collapse style={collapseStyles} isOpen={isOpen}>
    <p>Paragraph of text</p>
  </Collapse>
)
```

## Development

To run development

`npm start`

```bash
git clone [repo]
cd [repo]
npm i
npm start
```

- To develop and play around: `npm start`
- To build the bundle: `npm run build`

# CDN

https://unpkg.com/@kunukn/react-collapse/

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@kunukn/react-collapse/dist/react-collapse.css"
/>
<!-- UMD -->
<script src="https://unpkg.com/@kunukn/react-collapse"></script>
```

# NPM

https://www.npmjs.com/package/@kunukn/react-collapse

# Supported browsers

Modern browsers (Edge, Firefox, Chrome, Safari, etc).

# Supported React versions

- React version 16.3+ : use Collapse version 1
- React version 16.8+ : use Collapse version 2+

# Used React 16.3 life-cycles

- **render** (uses the style states to invoke CSS transition)
- **componentDidMount** (initial expanded or collapsed state)
- **getDerivedStateFromProps** (detect if isOpen props have changed and apply a new collapse state)
- **componentDidUpdate** (update style states from the four possible collapse states)

# Used React 16.8+ hooks

- **useState**
- **useEffect**
- **useRef**
- **useCallback**
- **useReducer**

# Design goals

- let the browser handle the animation using CSS height transition
- minimal in file size
- minimalistic API - only have a Collapse component which updates on isOpen props
- flexible - provide your own markup, styling and easing
- interruptible - can be reversed during movement
- inert - when collapsed you should tab over the collapsed component
- availability - from cdn or npm install
- collapsible on height only

# This was created with heavy inspiration from

[https://github.com/SparebankenVest/react-css-collapse](https://github.com/SparebankenVest/react-css-collapse) 🎆

# A version also exists for Vue

https://github.com/kunukn/vue-height-collapsible
