import React from 'react';
import Collapse from './Collapse.hooks';
import { render, fireEvent, cleanup, waitForElement } from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('<Collapse />', () => {
  it('should render without errors', () => {
    render(<Collapse />);
  });

  it('should render child', () => {
    let text = 'Some content';
    let Child = () => text;
    const { getByText, findByText, getByTestId, container, asFragment } = render(
      <Collapse>
        <Child />
      </Collapse>
    );

    expect(getByText(text)).toBeTruthy();
  });
});
