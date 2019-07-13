/* eslint-env browser */

/**
 * All debug logs are removed on build
 */

import "./collapse.css";
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import debugLog from "./debugLog";

let COLLAPSED = "collapsed";
let COLLAPSING = "collapsing";
let EXPANDING = "expanding";
let EXPANDED = "expanded";

function nextFrame(callback) {
  requestAnimationFrame(function() {
    setTimeout(callback, 0);
  });
}

function isMoving(collapseState) {
  return collapseState === EXPANDING || collapseState === COLLAPSING;
}

function Collapse({
  className,
  excludeStateCSS,
  children,
  transition,
  style,
  render,
  elementType,
  layoutEffect,
  isOpen,
  collapseHeight,
  onInit,
  onChange,
  ...rest
}) {
  let getCollapseHeight = () => collapseHeight || "0px";
  let getCollapsedVisibility = () => (collapseHeight ? "" : "hidden");

  let contentRef = useRef();
  let [collapseState, setCollapseState] = useState(
    isOpen ? EXPANDED : COLLAPSED
  );
  let [collapseStyle, setCollapseStyle] = useState({
    height: isOpen ? null : getCollapseHeight(),
    visibility: isOpen ? null : getCollapsedVisibility()
  });
  let [hasReversed, setHasReversed] = useState(false);
  let firstUpdate = useRef(true);

  let effect = layoutEffect ? useLayoutEffect : useEffect;

  effect(() => {
    if (!contentRef.current) return;

    if (firstUpdate.current) {
      onCallback(onInit);

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

  let onCallback = callback => {
    if (callback) {
      debugLog("onCallback " + callback.name);
      callback({
        collapseState,
        collapseStyle,
        hasReversed,
        isMoving: isMoving(collapseState)
      });
    }
  };

  function setCollapsed() {
    debugLog("setCollapsed");

    if (!contentRef.current) return;

    setCollapseStyle({
      height: getCollapseHeight(),
      visibility: getCollapsedVisibility()
    });
    onCallback(onChange);
  }

  function setCollapsing() {
    debugLog("setCollapsing");

    if (!contentRef.current) return;

    let height = getContentHeight(); // capture height before setting it to async setState method

    setCollapseStyle({
      height,
      visibility: ""
    });

    nextFrame(() => {
      setCollapseStyle({
        height: getCollapseHeight(),
        visibility: ""
      });
      onCallback(onChange);
    });
  }

  function setExpanding() {
    debugLog("setExpanding");

    nextFrame(() => {
      if (contentRef.current) {
        let height = getContentHeight(); // capture height before setting it to async setState method

        setCollapseStyle({
          height,
          visibility: ""
        });
        onCallback(onChange);
      }
    });
  }

  function setExpanded() {
    debugLog("setExpanded");

    if (!contentRef.current) return;

    setCollapseStyle({
      height: "",
      visibility: ""
    });
    onCallback(onChange);
  }

  function getContentHeight() {
    return `${contentRef.current.scrollHeight}px`;
  }

  function onTransitionEnd({ target, propertyName }) {
    if (target === contentRef.current && propertyName === "height") {
      debugLog(
        "onTransitionEnd",
        collapseState,
        propertyName,
        target.style.height
      );

      switch (collapseState) {
        case EXPANDING:
          if (target.style.height === "0px")
            // This is stale, a newer event has happened before this could execute
            debugLog(
              "onTransitionEnd height unexpected 0px",
              "ignore setExpanded"
            );
          else setCollapseState(EXPANDED);
          break;
        case COLLAPSING:
          if (target.style.height !== "0px")
            // This is stale, a newer event has happened before this could execute
            debugLog(
              `onTransitionEnd height unexpected ${target.style.height}`,
              "ignore setCollapsed"
            );
          else setCollapseState(COLLAPSED);
          break;
        default:
          debugLog("Ignored in onTransitionEnd", collapseState);
      }
    }
  }

  // getDerivedStateFromProps
  let didOpen = collapseState === EXPANDED || collapseState === EXPANDING;

  if (!didOpen && isOpen) {
    setHasReversed(collapseState === COLLAPSING);
    setCollapseState(EXPANDING);
  }
  if (didOpen && !isOpen) {
    setHasReversed(collapseState === EXPANDING);
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
  let collapseClassName = className;
  if (!excludeStateCSS) collapseClassName += ` -c-is--${collapseState}`;

  return (
    <ElementType
      ref={contentRef}
      style={computedStyle}
      className={collapseClassName}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      {typeof render === "function" ? render(collapseState) : children}
    </ElementType>
  );
}

Collapse.defaultProps = {
  className: "collapse-css-transition",
  elementType: "div",
  style: {}
};

export default Collapse;
