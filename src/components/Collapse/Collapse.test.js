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
    const { getByText } = render(
      <Collapse>
        <Child />
      </Collapse>
    );

    expect(getByText(text)).toBeTruthy();
  });

  it('should render collapsed by default', () => {
    const { container } = render(<Collapse />);

    const el = container.firstChild;

    expect(el.style.height).toBe('0px');
    expect(el.style.visibility).toBe('hidden');
  });

  it('should render default classNames', () => {
    const { container } = render(<Collapse />);

    const el = container.firstChild;

    expect(el.className.indexOf('collapse-css-transition') >= 0).toBe(true);
    expect(el.className.indexOf(' -c-is--collapsed') >= 0).toBe(true);
  });
});
