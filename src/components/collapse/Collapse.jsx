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

let defaultClassName = "collapse-css-transition";
let defaultElementType = "div";
let defaultCollapseHeight = "0px";

/**
 *
 * @param {function} callback
 */
function nextFrame(callback) {
  requestAnimationFrame(function() {
    //setTimeout(callback, 0); // NOT used because can be jumpy if click-spamming.
    requestAnimationFrame(callback); // This is used.
  });
}

function Collapse({
  children,
  transition,
  style,
  render,
  elementType = defaultElementType,
  isOpen,
  collapseHeight = defaultCollapseHeight,
  onInit,
  onChange,
  className = defaultClassName,
  addState,
  noAnim,
  overflowOnExpanded,
  ...rest
}) {
  let getCollapsedVisibility = () => (collapseHeight === "0px" ? "hidden" : "");

  let [__, forceUpdate] = useReducer(_ => _ + 1, 0);

  let elementRef = useRef();
  let [callbackTick, setCallbackTick] = useState(0);

  // Avoiding setState to control when stuff are updated.
  // Might not be needed.
  let state = useRef({
    collapse: isOpen ? EXPANDED : COLLAPSED,
    style: {
      height: isOpen ? "" : collapseHeight,
      visibility: isOpen ? "" : getCollapsedVisibility()
    }
  }).current;

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
      callback({ state: state.collapse, style: state.style, ...params });
    }
  };

  function setCollapsed() {
    if (!elementRef.current) return; // might be redundant

    // Update state
    state.collapse = COLLAPSED;

    debugLog("setCollapsed");

    state.style = {
      height: collapseHeight,
      visibility: getCollapsedVisibility()
    };
    forceUpdate();

    setTimeout(() => setCallbackTick(Date.now), 0); // callback and re-render
  }

  function setCollapsing() {
    if (!elementRef.current) return; // might be redundant

    if (noAnim) {
      return setCollapsed();
    }

    // Update state
    state.collapse = COLLAPSING;

    debugLog("setCollapsing");

    state.style = {
      height: getElementHeight(),
      visibility: ""
    };
    forceUpdate();

    nextFrame(() => {
      if (!elementRef.current) return;
      if (state.collapse !== COLLAPSING) return;

      state.style = {
        height: collapseHeight,
        visibility: ""
      };
      //forceUpdate();

      setCallbackTick(Date.now); // callback and re-render
    });
  }

  function setExpanding() {
    if (!elementRef.current) return; // might be redundant

    if (noAnim) {
      return setExpanded();
    }

    // Updatetate
    state.collapse = EXPANDING;

    debugLog("setExpanding");

    nextFrame(() => {
      if (!elementRef.current) return; // might be redundant
      if (state.collapse !== EXPANDING) return;

      state.style = {
        height: getElementHeight(),
        visibility: ""
      };
      // forceUpdate();

      setCallbackTick(Date.now); // callback and re-render
    });
  }

  function setExpanded() {
    if (!elementRef.current) return; // might be redundant

    // Update state
    state.collapse = EXPANDED;

    debugLog("setExpanded");

    state.style = {
      height: "",
      visibility: ""
    };
    forceUpdate();

    setTimeout(() => setCallbackTick(Date.now), 0); // callback and re-render
  }

  function getElementHeight() {
    // @ts-ignore
    return `${elementRef.current.scrollHeight}px`;
  }

  function onTransitionEnd({ target, propertyName }) {
    if (target === elementRef.current && propertyName === "height") {
      let styleHeight = target.style.height;

      debugLog("onTransitionEnd", state.collapse, propertyName, styleHeight);

      switch (state.collapse) {
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
          console.warn("Ignored in onTransitionEnd", state.collapse);
      }
    }
  }

  // getDerivedStateFromProps
  let didOpen = state.collapse === EXPANDED || state.collapse === EXPANDING;

  if (!didOpen && isOpen) setExpanding();

  if (didOpen && !isOpen) setCollapsing();
  // END getDerivedStateFromProps

  let overflow =
    state.collapse === EXPANDED && overflowOnExpanded ? "" : "hidden";

  let computedStyle = {
    overflow,
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
    ? `${className} --c-${state.collapse}`
    : className;

  debugLog("Render");

  return (
    <ElementType
      ref={callbackRef}
      style={computedStyle}
      onTransitionEnd={onTransitionEnd}
      className={collapseClassName}
      {...rest}
    >
      {typeof children === "function"
        ? children(state.collapse)
        : typeof render === "function"
        ? render(state.collapse)
        : children}
    </ElementType>
  );
}

export default Collapse;
