import * as React from 'react'

import { Collapse, CollapseProps } from '@kunukn/react-collapse'

const props: CollapseProps = {
  addState: true,
  className: 'CSS-class-name',
  collapseHeight: '4rem',
  elementType: 'article',
  isOpen: false,
  noAnim: true,
  overflowOnExpanded: true,
  style: { transitionDuration: '260ms' },
  transition: 'height 260ms cubic-bezier(0.4, 0, 0.2, 1)',
}

;<Collapse {...props}>
  <div>this is some content</div>{' '}
</Collapse>
;<Collapse
  onInit={({ state, style, node }) => {}}
  onChange={({ state, style }) => {}}
>
  <div>this is some content</div>
</Collapse>
;<Collapse
  render={(collapseState) => <div>this is the state {collapseState}</div>}
/>
;<Collapse>
  {(collapseState) => <div>this is the state {collapseState}</div>}
</Collapse>
