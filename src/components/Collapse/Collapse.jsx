import './collapse.scss';
import React from 'react';

const COLLAPSED = 'collapsed';
const COLLAPSING = 'collapsing';
const EXPANDING = 'expanding';
const EXPANDED = 'expanded';

export default class Collapse extends React.Component {
  state = {
    collapseState: this.props.isOpen ? EXPANDED : COLLAPSED,
    collapseStyle: {
      height: getCollapseHeight(this.props),
      visibility: getCollapseVisibility(this.props),
    },
    hasReversed: false,
  };

  render() {
    const {
      className,
      children,
      transition,
      render,
      elementType,
      collapseHeight, // exclude from attrs
      onInit, // exclude from attrs
      onChange, // exclude from attrs
      isOpen, // exclude from attrs
      ...attrs
    } = this.props;

    const style = {
      transition,
      ...this.state.collapseStyle,
    };

    const ElementType = elementType || 'div';
    const collapseClassName = `${className || 'collapse-css-transition'} --is-${this.state.collapseState}`;

    return (
      <ElementType
        ref={element => {
          this.content = element;
        }}
        style={style}
        className={collapseClassName}
        onTransitionEnd={this.onTransitionEnd}
        {...attrs}
      >
        {typeof render === 'function' ? render(this.state.collapseState) : children}
      </ElementType>
    );
  }

  // Detect a new collapse state from props.isOpen change
  static getDerivedStateFromProps(props, state) {
    const isOpen = state.collapseState === EXPANDED || state.collapseState === EXPANDING;

    if (!isOpen && props.isOpen) {
      return {
        hasReversed: state.collapseState === COLLAPSING,
        collapseState: EXPANDING,
      };
    }
    if (isOpen && !props.isOpen) {
      return {
        hasReversed: state.collapseState === EXPANDING,
        collapseState: COLLAPSING,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.state.collapseState === EXPANDED) {
      this.setExpanded();
    }
    this.onCallback(this.props.onInit);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (!this.content) return;

    if (this.state.collapseState === prevState.collapseState) return;

    console.log('componentDidUpdate - real work');

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
    console.log('onTransitionEnd', this.state.collapseState, propertyName);

    if (target === this.content && propertyName === 'height') {
      switch (this.state.collapseState) {
        case EXPANDING:
          this.setState({ collapseState: EXPANDED });
          break;
        case COLLAPSING:
          this.setState({ collapseState: COLLAPSED });
          break;
        // no default
      }
    }
  };

  getHeight = () => `${this.content.scrollHeight}px`;

  onCallback = callback => {
    callback &&
      callback({
        ...this.state,
        isMoving: isMoving(this.state.collapseState),
      });
  };

  setCollapsed = () => {
    console.log('setCollapsed');

    if (!this.content) return;

    this.setState(
      {
        collapseStyle: {
          height: getCollapseHeight(this.props),
          visibility: getCollapseVisibility(this.props),
        },
      },
      () => this.onCallback(this.props.onChange)
    );
  };

  setCollapsing = () => {
    console.log('setCollapsing');

    if (!this.content) return;

    const height = this.getHeight();

    this.setState({
      collapseStyle: {
        height,
        visibility: '',
      },
    });

    nextFrame(() => {
      this.setState(
        {
          collapseStyle: {
            height: getCollapseHeight(this.props),
            visibility: '',
          },
        },
        () => this.onCallback(this.props.onChange)
      );
    });
  };

  setExpanding = () => {
    console.log('setExpanding');

    nextFrame(() => {
      if (this.content) {
        const height = this.getHeight();

        this.setState(
          {
            collapseStyle: {
              height,
              visibility: '',
            },
          },
          () => this.onCallback(this.props.onChange)
        );
      }
    });
  };

  setExpanded = () => {
    console.log('setExpanded');

    if (!this.content) return;

    this.setState(
      {
        collapseStyle: {
          height: '',
          visibility: '',
        },
      },
      () => this.onCallback(this.props.onChange)
    );
  };
}

function nextFrame(callback) {
  // Ensure it is always visible on collapsing, afterFrame didn't work
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

function isMoving(collapseState) {
  return collapseState === EXPANDING || collapseState === COLLAPSING;
}

function getCollapseHeight(props) {
  return props.collapseHeight || '0px';
}

function getCollapseVisibility(props) {
  return props.collapseHeight ? '' : 'hidden';
}
