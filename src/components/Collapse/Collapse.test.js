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

  it("should render elementType", () => {
    const props = {
      elementType: "article",
      isOpen: false
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.nodeName).toBe("ARTICLE");
  });

  it("should render collapsed by default", () => {
    const { container } = render(<Collapse />);

    const collapse = container.firstChild;

    expect(collapse.style.height).toBe("0px");
    expect(collapse.style.visibility).toBe("hidden");
  });

  it("should render expanded when isOpen is true", () => {
    const props = {
      isOpen: true
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.style.height).not.toBe("0px");
    expect(collapse.style.visibility).not.toBe("hidden");
  });

  it("should render default classNames", () => {
    const { container } = render(<Collapse />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      true
    );
    expect(collapse.className.indexOf(" -c-is--collapsed") >= 0).toBe(true);
  });

  it("should call onChange on isOpen change", () => {
    const props = {
      isOpen: false,
      onChange: jest.fn()
    };

    const { rerender } = render(<Collapse {...props} />);

    rerender(<Collapse {...props} isOpen={true} />);

    expect(props.onChange.mock.calls.length).toBe(1);
  });

  it("should call onInit", () => {
    const props = {
      onInit: jest.fn()
    };

    render(<Collapse {...props} />);

    expect(props.onInit.mock.calls.length).toBe(1);
  });

  it("should apply transition prop", () => {
    const props = {
      transition: "height 300ms cubic-bezier(.4, 0, .2, 1)"
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.style.transition).toBe(
      "height 300ms cubic-bezier(.4, 0, .2, 1)"
    );
  });

  it("should apply collapseHeight prop", () => {
    const props = {
      collapseHeight: "10px"
    };

    const { container } = render(
      <Collapse {...props}>
        <p>this is a long paragraph</p>
      </Collapse>
    );

    const collapse = container.firstChild;

    expect(collapse.style.height).toBe("10px");
  });

  it("should apply custom props", () => {
    const props = {
      "aria-hidden": "true"
    };

    const { container } = render(
      <Collapse {...props}>
        <p>this is a long paragraph</p>
      </Collapse>
    );

    const collapse = container.firstChild;

    expect(collapse.getAttribute("aria-hidden")).toBe("true");
  });

  it("should render excludeStateCSS correctly", () => {
    const props = {
      excludeStateCSS: true
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      true
    );

    expect(collapse.className.indexOf(" -c-is--collapsed") >= 0).toBe(false);
  });

  it("should render exclude all class names correctly", () => {
    const props = {
      excludeStateCSS: true,
      className: ""
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      false
    );

    expect(collapse.className.indexOf(" -c-is--collapsed") >= 0).toBe(false);
  });
});
