import React from 'react';
import { shallow } from 'enzyme';
import Collapse from './Collapse';

const wrap = (props = {}) => shallow(<Collapse {...props} />);

test('render collapse', () => {
  const wrapper = wrap({
    children: 'test',
  });

  expect(wrapper.contains('test')).toBe(true);
});
