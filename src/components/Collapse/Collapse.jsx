import './collapse.scss';
import React from 'react';

const COLLAPSED = 'COLLAPSED';
const COLLAPSING = 'COLLAPSING';
const EXPANDING = 'EXPANDING';
const EXPANDED = 'EXPANDED';

export default class Collapse extends React.Component {
  state = {
    collapse: this.props.isOpen ? EXPANDED : COLLAPSED,
    collapseStyle: {
      maxHeight: this.props.collapseHeight || '0px',
      visibility: this.props.collapseHeight ? '' : 'hidden',
    },
  };

  getCollapseHeight = () => this.props.collapseHeight || '0px';

  getCollapsedVisibility = () => (this.props.collapseHeight ? '' : 'hidden');

  static getDerivedStateFromProps(props, state) {
    const isOpen = state.collapse === EXPANDED || state.collapse === EXPANDING;

    if (!isOpen && props.isOpen) {
      return {
        collapse: EXPANDING,
      };
    }
    if (isOpen && !props.isOpen) {
      return {
        collapse: COLLAPSING,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.state.collapse === EXPANDED) this.setExpanded();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');

    if (!this.content) return;

    if (this.state.collapse === prevState.collapse) return;

    console.log('componentDidUpdate - real work');

    if (this.state.collapse === EXPANDING) {
      this.setExpanding();
    } else if (this.state.collapse === COLLAPSING) {
      this.setCollapsing();
    } else if (this.state.collapse === EXPANDED) {
      this.setExpanded();
    } else if (this.state.collapse === COLLAPSED) {
      this.setCollapsed();
    }
  }

  componentWillUnmount() {}

  render() {
    const {
      className,
      classNameAppend,
      children,
      transition,
      render,
      elementType,
      collapseHeight,
      onChange,
      isOpen,
      ...attrs
    } = this.props;

    let style = {
      transition,
      ...this.state.collapseStyle,
    };

    let getRender = () => {
      if (typeof render === 'function') {
        return render(this.state.collapse);
      }
      return children;
    };

    const ElementType = elementType || 'div';

    let collapseClassName = className || 'collapse-css-transition';
    if (classNameAppend) collapseClassName += ` ${classNameAppend}`;

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
        {getRender()}
      </ElementType>
    );
  }

  onTransitionEnd = event => {
    console.log('onTransitionEnd');

    if (event.target === this.content && event.propertyName === 'max-height') {
      if (this.state.collapse === EXPANDING) {
        this.setState({ collapse: EXPANDED });
      } else if (this.state.collapse === COLLAPSING) {
        this.setState({ collapse: COLLAPSED });
      }
    }
  };

  getHeight = () => `${this.content.scrollHeight}px`;

  getOnChangeCallback = () =>
    this.props.onChange ? () => this.props.onChange({ ...this.state, transition: this.props.transition }) : () => {};

  setCollapsed = () => {
    console.log('setCollapsed');

    if (!this.content) return;

    this.setState(
      {
        collapseStyle: {
          maxHeight: this.getCollapseHeight(),
          visibility: this.getCollapsedVisibility(),
        },
      },
      this.getOnChangeCallback()
    );
  };

  setCollapsing = () => {
    console.log('setCollapsing');

    if (!this.content) return;

    const maxHeight = this.getHeight();

    this.setState({
      collapseStyle: {
        maxHeight,
        visibility: '',
      },
    });

    nextFrame(() => {
      this.setState(
        {
          collapseStyle: {
            maxHeight: this.getCollapseHeight(),
            visibility: '',
          },
        },
        this.getOnChangeCallback()
      );
    });
  };

  setExpanding = () => {
    console.log('setExpanding');

    nextFrame(() => {
      if (this.content) {
        const maxHeight = this.getHeight();

        this.setState(
          {
            collapseStyle: {
              maxHeight,
              visibility: '',
            },
          },
          this.getOnChangeCallback()
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
          maxHeight: '',
          visibility: '',
        },
      },
      this.getOnChangeCallback()
    );
  };
}

function nextFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
