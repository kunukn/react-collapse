import './collapse.scss';
import React from 'react';

const COLLAPSED = 'collapsed';
const COLLAPSING = 'collapsing';
const EXPANDING = 'expanding';
const EXPANDED = 'expanded';

export default class Collapse extends React.Component {
  state = {
    collapse: this.props.isOpen ? EXPANDED : COLLAPSED,
    collapseStyle: {
      maxHeight: this.props.collapseHeight || '0px',
      visibility: this.props.collapseHeight ? '' : 'hidden',
    },
  };

  render() {
    const {
      className,
      children,
      transition,
      render,
      elementType,
      collapseHeight, // exclude from attrs
      onChange, // exclude from attrs
      isOpen, // exclude from attrs
      ...attrs
    } = this.props;

    const style = {
      transition,
      ...this.state.collapseStyle,
    };

    const getRender = () => {
      if (typeof render === 'function') {
        return render(this.state.collapse);
      }
      return children;
    };

    const ElementType = elementType || 'div';
    const collapseClassName = `${className || 'collapse-css-transition'} -is-${this.state.collapse}`;

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

  getCollapseHeight = () => this.props.collapseHeight || '0px';

  getCollapsedVisibility = () => (this.props.collapseHeight ? '' : 'hidden');

  static getDerivedStateFromProps(props, state) {
    const isOpen = state.collapse === EXPANDED || state.collapse === EXPANDING;

    if (!isOpen && props.isOpen) {
      return { collapse: EXPANDING };
    }
    if (isOpen && !props.isOpen) {
      return { collapse: COLLAPSING };
    }

    return null;
  }

  componentDidMount() {
    if (this.state.collapse === EXPANDED) this.setExpanded();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (!this.content) return;

    if (this.state.collapse === prevState.collapse) return;

    console.log('componentDidUpdate - real work');

    this.updateStyleStateFromCollapseState();
  }

  updateStyleStateFromCollapseState = () => {
    switch (this.state.collapse) {
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
  };

  onTransitionEnd = ({ target, propertyName }) => {
    console.log('onTransitionEnd', this.state.collapse, propertyName);

    if (target === this.content && propertyName === 'max-height') {
      switch (this.state.collapse) {
        case EXPANDING:
          this.setState({ collapse: EXPANDED });
          break;
        case COLLAPSING:
          this.setState({ collapse: COLLAPSED });
          break;
        // no default
      }
    }
  };

  getHeight = () => `${this.content.scrollHeight}px`;

  getOnChangeCallback = () =>
    this.props.onChange
      ? () =>
          this.props.onChange({
            ...this.state,
            transition: this.props.transition,
            isMoving: isMoving(this.state.collapse),
          })
      : () => {};

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

/*
function afterFrame(callback) {
  // https://nolanlawson.com/2018/09/25/accurately-measuring-layout-on-the-web/
  // https://github.com/andrewiggins/yield-to-browser
  requestAnimationFrame(() => setTimeout(callback, 0));
}
*/

function nextFrame(callback) {
  // Ensure it is always visible on collapsing
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

function isMoving(collapse) {
  return collapse === EXPANDING || collapse === COLLAPSING;
}
