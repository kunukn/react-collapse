# react-collapse

Collapse component with css transition for elements with variable and dynamic height.

# Demo

https://codesandbox.io/s/k1439yw2v5

# CSS required

:warning: ️You need to specify the transition property or add a class selector with style (transition) in your own stylesheet to add animation. You can copy the smashing example below

```scss
.collapse-css-transition {
  transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
```

## Installation

`npm i -S @kunukn/react-collapse`

or

`yarn add @kunukn/react-collapse`

```js
import Collapse from '@kunukn/react-collapse';
// or with require syntax
const Collapse = require('@kunukn/react-collapse').default;

<Collapse isOpen={true || false}>
  <div>Random content</div>
</Collapse>;
```

## Properties

#### `isOpen`: PropTypes.boolean

Expands or collapses content.

#### `children`: PropTypes.node or `render`: PropTypes.func

One or multiple children with static, variable or dynamic height.

```js
<Collapse isOpen>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
  <img src="cutecat.gif" />
</Collapse>
```

```js
<Collapse
  isOpen
  render={collapse => (
    <>
      <p>this is the collapse state: {collapse}</p>
      <p>Another paragraph is also OK</p>
      <p>Images and any other content are ok too</p>
      <img src="cutecat.gif" />
    </>
  )}
/>
```

#### `className`: PropType.string

You can specify a className with your desired style and animation. By default `kn-react-collapse` will be added to the component.

#### `transition`: PropType.string

You can also specify a CSS transition in line by using the `transition` prop.

```js
<Collapse transition="max-height 300ms cubic-bezier(.4, 0, .2, 1)">
  <p>Paragraph of text</p>
</Collapse>
```

#### `onComplete = collapseState => { /* your implementation */ }`: PropTypes.func

Callback function for when your transition on `max-height` (specified in `className`) is finished. It can be used to trigger any function after transition is done. A collapse state is provided to your callback function.

### ARIA and data attributes

`Collapse` transfers `aria-` and `data-` attributes to the component's rendered DOM element. For example this can be used to set the `aria-hidden` attribute:

```js
<Collapse isOpen={isOpenState} aria-hidden={isOpenState ? 'false' : 'true'}>
  <p>Paragraph of text</p>
</Collapse>
```

#### `internals = state => { /* internal state is provided to you */}`: PropTypes.func

Callback function for the internals state used in the Collapse component.

## Development and testing

To run example covering all features, use `npm run storybook` or `yarn storybook`.

```bash
git clone [repo]
cd [repo]
npm i
npm start
open [http://localhost:6007](http://localhost:6007)
```

or with yarn

```bash
git clone [repo]
cd [repo]
yarn
yarn start
open [http://localhost:6007](http://localhost:6007)
```

# CDN

https://unpkg.com/@kunukn/react-collapse/

```html
<link rel="stylesheet" href="https://unpkg.com/@kunukn/react-collapse@0.0.4/dist/Collapse.css" />
<script src="https://unpkg.com/@kunukn/react-collapse"></script>

<script>
  var Collapse = window.Collapse.default;
</script>
```

# Heavily inspired from

[https://github.com/SparebankenVest/react-css-collapse](https://github.com/SparebankenVest/react-css-collapse) 🎆
