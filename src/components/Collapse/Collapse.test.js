import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "jest-dom/extend-expect";
jest.mock("./debugLog");
const Collapse = require("./Collapse.hooks").default;

global.requestAnimationFrame = cb => void cb();

afterEach(cleanup);

describe("<Collapse />", () => {
  it("should render without errors", () => {
    render(<Collapse />);
  });

  it("should render child", () => {
    let text = "Some content";
    let Child = () => text;
    const { getByText } = render(
      <Collapse>
        <Child />
      </Collapse>
    );

    expect(getByText(text)).toBeTruthy();
  });

  it("should render collapsed by default", () => {
    const { container } = render(<Collapse />);

    const el = container.firstChild;

    expect(el.style.height).toBe("0px");
    expect(el.style.visibility).toBe("hidden");
  });

  it("should render expanded when isOpen is true", () => {
    const props = {
      isOpen: true
    };

    const { container } = render(<Collapse {...props} />);

    const el = container.firstChild;

    expect(el.style.height).not.toBe("0px");
    expect(el.style.visibility).not.toBe("hidden");
  });

  it("should render default classNames", () => {
    const { container } = render(<Collapse />);

    const el = container.firstChild;

    expect(el.className.indexOf("collapse-css-transition") >= 0).toBe(true);
    expect(el.className.indexOf(" -c-is--collapsed") >= 0).toBe(true);
  });

  it("should call onChange on isOpen change", () => {
    const props = {
      isOpen: false,
      onChange: jest.fn()
    };

    const { container, rerender } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    if (!collapse) {
      throw new Error("not found");
    }

    rerender(<Collapse {...props} isOpen={true} />);

    expect(props.onChange.mock.calls.length).toBe(1);
  });

  it("should call onInit", () => {
    const props = {
      isOpen: false,
      onInit: jest.fn()
    };

    render(<Collapse {...props} />);

    expect(props.onInit.mock.calls.length).toBe(1);
  });
});
