import React from 'react';
import { shallow } from 'enzyme';
//import { render, fireEvent } from '@testing-library/react';
import Collapse from './Collapse';

const wrap = (props = {}) => shallow(<Collapse {...props} />);
const doMount = (props = {}) => mount(<Collapse {...props} />);

test('render children', () => {
  const wrapper = wrap({
    children: 'test'
  });

  expect(wrapper.contains('test')).toBe(true);
});

test('render mounted children', () => {
  const mounted = doMount({
    children: 'test'
  });
  expect(mounted.contains('test')).toBe(true);
  expect(mounted).to.have.style('height', '0px');
  expect(mounted).to.have.style('visibility', 'hidden');
});
