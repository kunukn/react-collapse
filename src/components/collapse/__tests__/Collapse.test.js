import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  act
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
jest.mock("../debugLog");
import Collapse from "../Collapse";

jest.useFakeTimers();

beforeEach(() => {
  jest.spyOn(global, "requestAnimationFrame").mockImplementation(cb => cb());
});

afterEach(() => {
  global.requestAnimationFrame.mockRestore();
  cleanup();
});

/**
 * Testing implementation details on purpose.
 * Ensure the library API are behaving correct.
 *
 */

describe("<Collapse />", () => {
  it("should render without errors", () => {
    render(<Collapse />);
  });

  it("should render child", () => {
    let text = "Some content";

    const props = {
      children: () => text,
      isOpen: true
    };

    const { getByText } = render(<Collapse {...props} />);

    expect(getByText(text)).toBeInTheDocument();
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
    expect(collapse.className.indexOf("--c-collapsed") >= 0).toBe(false);
  });

  it("should render addState collapsed className", () => {
    const { container } = render(<Collapse addState />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      true
    );
    expect(collapse.className.indexOf("--c-collapsed") >= 0).toBe(true);
    expect(collapse.className.indexOf("--c-expanded") >= 0).toBe(false);
  });

  it("should render addState expanded className", () => {
    const { container } = render(<Collapse isOpen addState />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      true
    );

    expect(collapse.className.indexOf("--c-expanded") >= 0).toBe(true);
    expect(collapse.className.indexOf("--c-collapsed") >= 0).toBe(false);
  });

  it("should call onInit but not onChange on first render", () => {
    const props = {
      isOpen: false,
      onChange: jest.fn(),
      onInit: jest.fn(),
      children: <div>some content.</div>
    };

    render(<Collapse {...props} />);

    expect(props.onInit.mock.calls.length).toBe(1);
    expect(props.onChange.mock.calls.length).toBe(0);
  });

  it("should call onChange on isOpen change where isOpen is false", () => {
    const props = {
      isOpen: false,
      onChange: jest.fn(),
      onInit: jest.fn(),
      children: <div>some content.</div>
    };

    const { rerender } = render(<Collapse {...props} />);

    expect(props.onInit.mock.calls.length).toBe(1);

    rerender(<Collapse {...props} isOpen={true} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(props.onChange.mock.calls.length).toBe(1);

    let callbackProps = props.onChange.mock.calls[0][0];
    expect(callbackProps.state).toBe("expanding");
    expect(callbackProps.style.visibility).toBeFalsy();
    expect(callbackProps.node).toBeFalsy();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it("should call onChange on isOpen change where isOpen is true", () => {
    const props = {
      isOpen: true,
      onInit: jest.fn(),
      onChange: jest.fn()
    };

    const { rerender } = render(<Collapse {...props} />);

    rerender(<Collapse {...props} isOpen={false} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(props.onChange.mock.calls.length).toBe(1);

    let callbackProps = props.onChange.mock.calls[0][0];
    expect(callbackProps.state).toBe("collapsing");
    expect(callbackProps.style).toBeTruthy();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
  });

  it("should call onInit where isOpen is false", () => {
    const props = {
      isOpen: false,
      elementType: "section",
      onInit: jest.fn()
    };

    const { rerender } = render(<Collapse {...props} />);
    rerender(<Collapse {...props} isOpen={true} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(props.onInit.mock.calls.length).toBe(1);

    let callbackProps = props.onInit.mock.calls[0][0];
    expect(callbackProps.state).toBe("collapsed");
    expect(callbackProps.style.height).toBe("0px");
    expect(callbackProps.style.visibility).toBe("hidden");
    expect(callbackProps.node.nodeName).toBe("SECTION");
  });

  it("should call onInit where isOpen is true", () => {
    const props = {
      onInit: jest.fn(),
      isOpen: true,
      children: <div>some content.</div>
    };

    const { rerender } = render(<Collapse {...props} />);

    rerender(<Collapse {...props} isOpen={true} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(props.onInit.mock.calls.length).toBe(1);

    let callbackProps = props.onInit.mock.calls[0][0];
    expect(callbackProps.state).toBe("expanded");
    expect(callbackProps.style.height).toBe("");
    expect(callbackProps.style.visibility).toBe("");
  });

  it("should apply transition prop", () => {
    const props = {
      transition: "height 280ms cubic-bezier(.4, 0, .2, 1)"
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.style.transition).toBe(
      "height 280ms cubic-bezier(.4, 0, .2, 1)"
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

  it("should render exclude all class names correctly", () => {
    const props = {
      className: ""
    };

    const { container } = render(<Collapse {...props} />);

    const collapse = container.firstChild;

    expect(collapse.className.indexOf("collapse-css-transition") >= 0).toBe(
      false
    );
  });

  it("should call render prop collapsed", () => {
    const props = {
      render: state => <div>{state}</div>
    };

    const { getByText } = render(<Collapse {...props} />);

    expect(getByText("collapsed")).toBeTruthy();
  });

  it("should call render prop expanded", () => {
    const props = {
      isOpen: true,
      render: state => <div>{state}</div>
    };

    const { getByText } = render(<Collapse {...props} />);

    expect(getByText("expanded")).toBeTruthy();
  });

  it("should apply render-prop pattern on children if children is a function", () => {
    const props = {
      children: state => <div>{state}</div>
    };

    const { getByText } = render(<Collapse {...props} />);

    expect(getByText("collapsed")).toBeTruthy();
  });

  it("should call onInit again if elementType is changed", () => {
    const props = {
      isOpen: false,
      onInit: jest.fn()
    };

    const { rerender, container } = render(<Collapse {...props} />);

    const collapse1 = container.firstChild;

    rerender(<Collapse {...props} elementType="article" />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    const collapse2 = container.firstChild;

    expect(props.onInit.mock.calls.length).toBe(2);

    expect(collapse1.nodeName).toBe("DIV");
    expect(collapse2.nodeName).toBe("ARTICLE");

    let callbackProps1 = props.onInit.mock.calls[0][0];
    let callbackProps2 = props.onInit.mock.calls[1][0];

    expect(callbackProps1.state).toBe("collapsed");
    expect(callbackProps2.state).toBe("collapsed");
  });

  it("should have expanded as next state from collapsed when using noAnim", () => {
    const props = {
      isOpen: false,
      noAnim: true,
      onChange: jest.fn(),
      children: state => <div>{state}</div>
    };

    const { rerender, getByText } = render(<Collapse {...props} />);

    expect(getByText("collapsed")).toBeTruthy();

    rerender(<Collapse {...props} isOpen={true} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(getByText("expanded")).toBeTruthy();
    let callbackProps = props.onChange.mock.calls[0][0];
    expect(callbackProps.state).toBe("expanded");
  });

  it("should have collapsed as next state from expanded when using noAnim", () => {
    const props = {
      isOpen: true,
      noAnim: true,
      onChange: jest.fn(),
      children: state => <div>{state}</div>
    };

    const { rerender, getByText } = render(<Collapse {...props} />);

    expect(getByText("expanded")).toBeTruthy();

    rerender(<Collapse {...props} isOpen={false} />);

    act(() => {
      /* fire events that update state */
      jest.advanceTimersByTime(1);
    });

    expect(getByText("collapsed")).toBeTruthy();
    let callbackProps = props.onChange.mock.calls[0][0];
    expect(callbackProps.state).toBe("collapsed");
  });

  it("should be overflow hidden on expanded state by default", () => {
    const props = {
      isOpen: true,
    };

    const { container } = render(<Collapse {...props} />);
    const collapse = container.firstChild;

    expect(collapse.style.overflow).toBe("hidden");
  });

  it("should allow overflow on expanded state when overflowOnExpanded is added", () => {
    const props = {
      isOpen: true,
      overflowOnExpanded: true
    };

    const { container } = render(<Collapse {...props} />);
    const collapse = container.firstChild;

    expect(collapse.style.overflow).toBe("");
  });

  it("should NOT allow overflow on collapsed state when overflowOnExpanded is added", () => {
    const props = {
      isOpen: false,
      overflowOnExpanded: true
    };

    const { container } = render(<Collapse {...props} />);
    const collapse = container.firstChild;

    expect(collapse.style.overflow).toBe("hidden");
  });
});
