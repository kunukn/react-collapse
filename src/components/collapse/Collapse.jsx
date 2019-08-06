/* eslint-env browser */

/**
 * All debug logs are removed on build
 */

import "./collapse.css";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback
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
    setTimeout(callback, 0);
  });
}

function useInstance(object) {
  return useRef(object).current;
}

function Collapse({
  children,
  transition,
  style,
  render,
  elementType,
  lazyEffect,
  isOpen,
  collapseHeight,
  onInit,
  onChange,
  ...rest
}) {
  let getCollapseHeight = () => collapseHeight;
  let getCollapsedVisibility = () => (collapseHeight === "0px" ? "hidden" : "");

  let elementRef = useRef();
  let [collapseState, setCollapseState] = useState(
    isOpen ? EXPANDED : COLLAPSED
  );
  let [collapseStyle, setCollapseStyle] = useState({
    height: isOpen ? "" : getCollapseHeight(),
    visibility: isOpen ? "" : getCollapsedVisibility()
  });
  let [callbackTick, invokeCallback] = useState(0);
  let firstUpdate = useRef(true);

  let state = useInstance({
    collapseState: isOpen ? EXPANDED : COLLAPSED,
    style: {
      height: isOpen ? "" : getCollapseHeight(),
      visibility: isOpen ? "" : getCollapsedVisibility()
    }
  });

  let effect = lazyEffect ? useEffect : useLayoutEffect;

  useEffect(() => {
    // Invoke callback when data are updated, use Effect to sync state.
    callbackTick && onCallback(onChange);
  }, [callbackTick]);

  effect(() => {
    if (!elementRef.current) return;

    if (firstUpdate.current) {
      // Don't run effect on first render, the DOM styles are already correctly set
      firstUpdate.current = false;
      debugLog("skip effect first render");
      return;
    }

    debugLog("effect after collapseState update");

    switch (collapseState) {
      case EXPANDING:
        setExpanding();
        break;
      case COLLAPSING:
        setCollapsing();
        break;
      case EXPANDED:
        setExpanded();
        break;
      case COLLAPSED:
        setCollapsed();
        break;
      // no default
    }
  }, [collapseState]);

  /**
   *
   * @param {function} callback
   */
  let onCallback = (callback, params = {}) => {
    if (callback) {
      debugLog("onCallback " + callback.name);
      callback({ state: collapseState, style: collapseStyle, ...params });
    }
  };

  function setCollapsed() {
    if (!elementRef.current) return;
    if (collapseState !== COLLAPSED) return;

    state.collapseState = COLLAPSED;

    debugLog("setCollapsed");

    setCollapseStyle({
      height: getCollapseHeight(),
      visibility: getCollapsedVisibility()
    });
    invokeCallback(Date.now());
  }

  function setCollapsing() {
    if (!elementRef.current) return;
    if (collapseState !== COLLAPSING) return;

    state.collapseState = COLLAPSING;

    debugLog("setCollapsing");

    let height = getElementHeight(); // capture height before setting it to async setState method

    setCollapseStyle({
      height,
      visibility: ""
    });

    nextFrame(() => {
      if (!elementRef.current) return;
      if (collapseState !== COLLAPSING) return;

      setCollapseStyle({
        height: getCollapseHeight(),
        visibility: ""
      });
      invokeCallback(Date.now());
    });
  }

  function setExpanding() {
    if (!elementRef.current) return;
    if (collapseState !== EXPANDING) return;

    debugLog("setExpanding");

    state.collapseState = EXPANDING;

    nextFrame(() => {
      if (!elementRef.current) return;
      if (collapseState !== EXPANDING) return;

      let height = getElementHeight(); // capture height before setting it to async setState method

      setCollapseStyle({
        height,
        visibility: ""
      });

      state.style.height = height;
      state.style.visibility = "";

      invokeCallback(Date.now());
    });
  }

  function setExpanded() {
    if (!elementRef.current) return;
    if (collapseState !== EXPANDED) return;

    state.collapseState = EXPANDED;

    debugLog("setExpanded");

    setCollapseStyle({
      height: "",
      visibility: ""
    });

    state.style.height = "";
    state.style.visibility = "";

    invokeCallback(Date.now());
  }

  function getElementHeight() {
    // @ts-ignore
    return `${elementRef.current.scrollHeight}px`;
  }

  function onTransitionEnd({ target, propertyName }) {
    if (target === elementRef.current && propertyName === "height") {
      let styleHeight = target.style.height;

      debugLog("onTransitionEnd", collapseState, propertyName, styleHeight);

      switch (collapseState) {
        case EXPANDING:
          if (styleHeight === "" || styleHeight === collapseHeight)
            // This is stale, a newer event has happened before this could execute
            console.warn(
              `onTransitionEnd height unexpected ${styleHeight}`,
              "ignore setExpanded"
            );
          else setCollapseState(EXPANDED);
          break;
        case COLLAPSING:
          if (styleHeight === "" || styleHeight !== collapseHeight)
            // This is stale, a newer event has happened before this could execute
            console.warn(
              `onTransitionEnd height unexpected ${styleHeight}`,
              "ignore setCollapsed"
            );
          else setCollapseState(COLLAPSED);
          break;
        default:
          console.warn("Ignored in onTransitionEnd", collapseState);
      }
    }
  }

  // getDerivedStateFromProps
  let didOpen = collapseState === EXPANDED || collapseState === EXPANDING;

  if (!didOpen && isOpen) {
    setCollapseState(EXPANDING);
  }
  if (didOpen && !isOpen) {
    setCollapseState(COLLAPSING);
  }
  // END getDerivedStateFromProps

  let computedStyle = {
    overflow: "hidden",
    transition,
    ...style,
    ...collapseStyle
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

  return (
    <ElementType
      ref={callbackRef}
      style={computedStyle}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      {typeof children === "function"
        ? children(collapseState)
        : typeof render === "function"
        ? render(collapseState)
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
