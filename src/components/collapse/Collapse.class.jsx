import "./collapse.css";
import React from "react";
import debugLog from "./debugLog";

const COLLAPSED = "collapsed";
const COLLAPSING = "collapsing";
const EXPANDING = "expanding";
const EXPANDED = "expanded";

export default class Collapse extends React.Component {
  static defaultProps = {
    style: {}
  };
  state = {
    collapseState: this.props.isOpen ? EXPANDED : COLLAPSED,
    collapseStyle: {
      height: this.props.isOpen ? null : getCollapseHeight(this.props),
      visibility: this.props.isOpen ? null : getCollapseVisibility(this.props)
    }
  };

  render() {
    const {
      className,
      addState,
      children,
      transition,
      style,
      render,
      elementType,
      noAnim,
      overflowOnExpanded,
      collapseHeight, // exclude from ...rest
      onInit,
      onChange,
      isOpen,
      ...rest
    } = this.props;

    let overflow =
      this.state.collapseState === EXPANDED && overflowOnExpanded
        ? ""
        : "hidden";

    let computedStyle = {
      overflow,
      transition
      //...style,
      //...this.state.collapseStyle
    };
    Object.assign(computedStyle, style);
    Object.assign(computedStyle, this.state.collapseStyle);

    const ElementType = elementType || "div";
    let collapseClassName = addState
      ? `${className} --c-${this.state.collapseState}`
      : className;

    return (
      <ElementType
        ref={element => {
          this.content = element;
        }}
        style={computedStyle}
        className={collapseClassName}
        onTransitionEnd={this.onTransitionEnd}
        {...rest}
      >
        {typeof children === "function"
          ? children(this.state.collapseState)
          : typeof render === "function"
          ? render(this.state.collapseState)
          : children}
      </ElementType>
    );
  }

  // Detect a new collapse state from props.isOpen change
  static getDerivedStateFromProps(props, state) {
    const isOpen =
      state.collapseState === EXPANDED || state.collapseState === EXPANDING;

    if (!isOpen && props.isOpen) {
      return {
        collapseState: props.noAnim ? EXPANDED : EXPANDING
      };
    }
    if (isOpen && !props.isOpen) {
      return {
        collapseState: props.noAnim ? COLLAPSED : COLLAPSING
      };
    }

    return null;
  }

  componentDidMount() {
    this.onCallback(this.props.onInit);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.content) return;

    if (this.state.collapseState === prevState.collapseState) return;

    switch (this.state.collapseState) {
      case EXPANDING:
        this.setExpanding();
        break;
      case COLLAPSING:
        this.setCollapsing();
        break;
      case EXPANDED:
        this.setExpanded();
        break;
      case COLLAPSED:
        this.setCollapsed();
        break;
      // no default
    }
  }

  onTransitionEnd = ({ target, propertyName }) => {
    if (target === this.content && propertyName === "height") {
      debugLog(
        "onTransitionEnd",
        this.state.collapseState,
        propertyName,
        target.style.height
      );

      switch (this.state.collapseState) {
        case EXPANDING:
          if (target.style.height === "0px")
            // This is stale, a newer event has happened before this could execute
            debugLog(
              "onTransitionEnd height unexpected 0px",
              "ignore setExpanded"
            );
          else this.setState({ collapseState: EXPANDED });
          break;
        case COLLAPSING:
          if (target.style.height !== "0px")
            // This is stale, a newer event has happened before this could execute
            debugLog(
              `onTransitionEnd height unexpected ${target.style.height}`,
              "ignore setCollapsed"
            );
          else this.setState({ collapseState: COLLAPSED });
          break;
        default:
          debugLog("Ignored in onTransitionEnd", this.state.collapseState);
      }
    }
  };

  getHeight = () => `${this.content.scrollHeight}px`;

  onCallback = callback => {
    callback &&
      callback({
        ...this.state,
        isMoving: isMoving(this.state.collapseState)
      });
  };

  setCollapsed = () => {
    if (!this.content) return;

    this.setState(
      {
        collapseStyle: {
          height: getCollapseHeight(this.props),
          visibility: getCollapseVisibility(this.props)
        }
      },
      () => this.onCallback(this.props.onChange)
    );
  };

  setCollapsing = () => {
    if (!this.content) return;

    const height = this.getHeight();

    this.setState({
      collapseStyle: {
        height,
        visibility: ""
      }
    });

    nextFrame(() => {
      this.setState(
        {
          collapseStyle: {
            height: getCollapseHeight(this.props),
            visibility: ""
          }
        },
        () => this.onCallback(this.props.onChange)
      );
    });
  };

  setExpanding = () => {
    nextFrame(() => {
      if (this.content) {
        const height = this.getHeight();

        this.setState(
          {
            collapseStyle: {
              height,
              visibility: ""
            }
          },
          () => this.onCallback(this.props.onChange)
        );
      }
    });
  };

  setExpanded = () => {
    if (!this.content) return;

    this.setState(
      {
        collapseStyle: {
          height: "",
          visibility: ""
        }
      },
      () => this.onCallback(this.props.onChange)
    );
  };
}

function nextFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

function isMoving(collapseState) {
  return collapseState === EXPANDING || collapseState === COLLAPSING;
}

function getCollapseHeight(props) {
  return props.collapseHeight || "0px";
}

function getCollapseVisibility(props) {
  return props.collapseHeight ? "" : "hidden";
}
