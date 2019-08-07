/* eslint-env browser */

/**
 * All debug logs are removed on build
 */

import "./collapse.css";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer
} from "react";
import debugLog from "./debugLog";

// using let instead of const,
// experimenting with ES2015 bundle which gets a bit smaller when using let over const.
let COLLAPSED = "collapsed";
let COLLAPSING = "collapsing";
let EXPANDING = "expanding";
let EXPANDED = "expanded";

/**
 *
 * @param {function} callback
 */
function nextFrame(callback) {
  requestAnimationFrame(function() {
    //setTimeout(callback, 0); // can be jumpy if click-spamming
    requestAnimationFrame(callback);
  });
}

let useInstance = object => useRef(object).current;

function Collapse({
  children,
  transition,
  style,
  render,
  elementType,
  isOpen,
  collapseHeight,
  onInit,
  onChange,
  className,
  addState,
  ...rest
}) {
  let getCollapsedVisibility = () => (collapseHeight === "0px" ? "hidden" : "");

  const [__, forceUpdate] = useReducer(x => x + 1, 0);

  let elementRef = useRef();
  let [callbackTick, invokeCallback] = useState(0);

  let state = useInstance({
    collapseState: isOpen ? EXPANDED : COLLAPSED,
    style: {
      height: isOpen ? "" : collapseHeight,
      visibility: isOpen ? "" : getCollapsedVisibility()
    }
  });

  useEffect(() => {
    // Invoke callback when data are updated, use Effect to sync state.
    callbackTick && onCallback(onChange);
  }, [callbackTick]);

  /**
   *
   * @param {function} callback
   */
  let onCallback = (callback, params = {}) => {
    if (callback) {
      debugLog("onCallback " + callback.name);
      callback({ state: state.collapseState, style: state.style, ...params });
    }
  };

  function setCollapsed() {
    if (!elementRef.current) return;

    state.collapseState = COLLAPSED;

    debugLog("setCollapsed");

    state.style = {
      height: collapseHeight,
      visibility: getCollapsedVisibility()
    };
    forceUpdate();

    invokeCallback(Date.now());
  }

  function setCollapsing() {
    if (!elementRef.current) return;

    state.collapseState = COLLAPSING;

    debugLog("setCollapsing");

    state.style = {
      height: getElementHeight(),
      visibility: ""
    };
    forceUpdate();

    nextFrame(() => {
      if (!elementRef.current) return;
      if (state.collapseState !== COLLAPSING) return;

      state.style = {
        height: collapseHeight,
        visibility: ""
      };
      forceUpdate();

      invokeCallback(Date.now());
    });
  }

  function setExpanding() {
    if (!elementRef.current) return;

    debugLog("setExpanding");

    state.collapseState = EXPANDING;

    nextFrame(() => {
      if (!elementRef.current) return;
      if (state.collapseState !== EXPANDING) return;

      state.style = {
        height: getElementHeight(),
        visibility: ""
      };
      forceUpdate();

      invokeCallback(Date.now());
    });
  }

  function setExpanded() {
    if (!elementRef.current) return;

    state.collapseState = EXPANDED;

    debugLog("setExpanded");

    state.style = {
      height: "",
      visibility: ""
    };
    forceUpdate();

    invokeCallback(Date.now());
  }

  function getElementHeight() {
    // @ts-ignore
    return `${elementRef.current.scrollHeight}px`;
  }

  function onTransitionEnd({ target, propertyName }) {
    if (target === elementRef.current && propertyName === "height") {
      let styleHeight = target.style.height;

      debugLog(
        "onTransitionEnd",
        state.collapseState,
        propertyName,
        styleHeight
      );

      switch (state.collapseState) {
        case EXPANDING:
          if (styleHeight === "" || styleHeight === collapseHeight)
            // This is stale, a newer event has happened before this could execute
            console.warn(
              `onTransitionEnd height unexpected ${styleHeight}`,
              "ignore setExpanded"
            );
          else setExpanded();
          break;
        case COLLAPSING:
          if (styleHeight === "" || styleHeight !== collapseHeight)
            // This is stale, a newer event has happened before this could execute
            console.warn(
              `onTransitionEnd height unexpected ${styleHeight}`,
              "ignore setCollapsed"
            );
          else setCollapsed();
          break;
        default:
          console.warn("Ignored in onTransitionEnd", state.collapseState);
      }
    }
  }

  // getDerivedStateFromProps
  let didOpen =
    state.collapseState === EXPANDED || state.collapseState === EXPANDING;

  if (!didOpen && isOpen) setExpanding();

  if (didOpen && !isOpen) setCollapsing();
  // END getDerivedStateFromProps

  let computedStyle = {
    overflow: "hidden",
    transition,
    ...style,
    ...state.style
  };
  let ElementType = elementType;

  let callbackRef = useCallback(
    node => {
      if (node) {
        elementRef.current = node;
        onCallback(onInit, { node });
        debugLog("callback ref");
      }
    },
    [elementType]
  );

  let collapseClassName = addState
    ? `${className} --c-${state.collapseState}`
    : className;

  return (
    <ElementType
      ref={callbackRef}
      style={computedStyle}
      onTransitionEnd={onTransitionEnd}
      className={collapseClassName}
      {...rest}
    >
      {typeof children === "function"
        ? children(state.collapseState)
        : typeof render === "function"
        ? render(state.collapseState)
        : children}
    </ElementType>
  );
}

Collapse.defaultProps = {
  className: "collapse-css-transition",
  elementType: "div",
  style: {},
  collapseHeight: "0px"
};

export default Collapse;
