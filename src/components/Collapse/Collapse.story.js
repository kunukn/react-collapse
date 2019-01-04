import React from 'react';
import Collapse from './Collapse';
import { storiesOf } from '@storybook/react';
import { withNotes, withMarkdownNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { backgrounds } from 'root/stories/addon-backgrounds';

export default function CollapseStory() {
  const props = {
    name: 'collapse',
  };

  storiesOf('Collapses', module)
    .addDecorator(backgrounds)

    .add(
      'default',
      withMarkdownNotes(`
# Collapse default

usage description here

## React

~~~jsx
<Collapse>
  something
</Collapse>
~~~
      `)(() => (
        <Collapse isOpen {...props}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Collapse>
      ))
    );
}
