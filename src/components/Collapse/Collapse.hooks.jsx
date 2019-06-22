/**
 * All console logs are removed on build
 */

import './collapse.css';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

let COLLAPSED = 'collapsed';
let COLLAPSING = 'collapsing';
let EXPANDING = 'expanding';
let EXPANDED = 'expanded';

export default function Collapse({
  className,
  removeClassName,
  removeCSS,
  children,
  transition,
  render,
  elementType,
  layoutEffect,
  isOpen,
  collapseHeight,
  onInit,
  onChange,
  ...rest
}) {
  let contentRef = useRef();
  let [collapseState, setCollapseState] = useState(isOpen ? EXPANDED : COLLAPSED);
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
      console.log('skip effect first render');
      return;
    }

    console.log('effect after didUpdate DOM update');

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

  function onCallback(callback) {
    if (callback) {
      console.log('onCallback ' + callback.name);
      callback({
        collapseState,
        collapseStyle,
        hasReversed,
        isMoving: isMoving(collapseState)
      });
    }
  }

  function getCollapseHeight() {
    return collapseHeight || '0px';
  }

  function getCollapsedVisibility() {
    return collapseHeight ? '' : 'hidden';
  }

  function setCollapsed() {
    console.log('setCollapsed');

    if (!contentRef.current) return;

    setCollapseStyle({
      height: getCollapseHeight(),
      visibility: getCollapsedVisibility()
    });
    onCallback(onChange);
  }

  function setCollapsing() {
    console.log('setCollapsing');

    if (!contentRef.current) return;

    let height = getContentHeight(); // capture height before setting it to async setState method

    setCollapseStyle({
      height,
      visibility: ''
    });

    nextFrame(() => {
      setCollapseStyle({
        height: getCollapseHeight(),
        visibility: ''
      });
      onCallback(onChange);
    });
  }

  function setExpanding() {
    console.log('setExpanding');

    nextFrame(() => {
      if (contentRef.current) {
        let height = getContentHeight(); // capture height before setting it to async setState method

        setCollapseStyle({
          height,
          visibility: ''
        });
        onCallback(onChange);
      }
    });
  }

  function setExpanded() {
    console.log('setExpanded');

    if (!contentRef.current) return;

    setCollapseStyle({
      height: '',
      visibility: ''
    });
    onCallback(onChange);
  }

  function getContentHeight() {
    return `${contentRef.current.scrollHeight}px`;
  }

  function onTransitionEnd({ target, propertyName }) {
    console.log('onTransitionEnd', collapseState, propertyName);

    if (target === contentRef.current && propertyName === 'height') {
      switch (collapseState) {
        case EXPANDING:
          setCollapseState(EXPANDED);
          break;
        case COLLAPSING:
          setCollapseState(COLLAPSED);
          break;
        // no default
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

  let style = {
    transition,
    ...collapseStyle
  };
  let ElementType = elementType || 'div';
  let collapseClassName = `${className || ''} ${removeClassName || removeCSS ? '' : 'collapse-css-transition'} ${
    removeCSS ? '' : '-c--' + collapseState
  }`.trim();

  return (
    <ElementType
      ref={contentRef}
      style={style}
      className={collapseClassName}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      {typeof render === 'function' ? render(collapseState) : children}
    </ElementType>
  );
}

function nextFrame(callback) {
  // Ensure it is always visible on collapsing, afterFrame didn't work
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

function isMoving(collapseState) {
  return collapseState === EXPANDING || collapseState === COLLAPSING;
}
