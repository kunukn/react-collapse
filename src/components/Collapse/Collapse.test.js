import React from 'react';
import Collapse from './Collapse.hooks';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<Collapse />', () => {
  it('should render without errors', () => {
    let Child = () => 'Some content';
    const { getByText, getByTestId, container, asFragment } = render(
      <Collapse>
        <Child />
      </Collapse>
    );

    let el = getByText('Some content');
    expect(el).toBeTruthy();
  });
});
