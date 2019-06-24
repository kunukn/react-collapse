import React from 'react';
import Collapse from './Collapse.hooks';

const wrap = (props = {}) => global.enzymeShallow(<Collapse {...props} />);
const wrapMount = (props = {}) => global.enzymeMount(<Collapse {...props} />);
const wrapRender = (props = {}) => global.enzymeRender(<Collapse {...props} />);

test('render children', () => {
  const wrapper = wrap({
    children: 'test'
  });

  expect(wrapper.contains('test')).toBe(true);
});
