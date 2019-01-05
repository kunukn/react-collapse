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
      maxHeight: '0px',
      visibility: 'hidden',
    },
  };

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

  getSnapshotBeforeUpdate(prevProps, prevState) {
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
    const { className, children, transition, render, internals, isOpen, onComplete, ...attrs } = this.props;

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

    return (
      <div
        ref={element => {
          this.content = element;
        }}
        style={style}
        className={className || 'collapse-css-transition'}
        onTransitionEnd={this.onTransitionEnd}
        {...attrs}
      >
        {getRender()}
      </div>
    );
  }

  onTransitionEnd = event => {
    console.log('onTransitionEnd');

    const { onComplete } = this.props;

    if (event.target === this.content && event.propertyName === 'max-height') {
      if (this.state.collapse === EXPANDING) {
        this.setState({ collapse: EXPANDED });
      } else if (this.state.collapse === COLLAPSING) {
        this.setState({ collapse: COLLAPSED });
      }

      onComplete && onComplete(this.state.collapse);
    }
  };

  getHeight = () => this.content.scrollHeight + 'px';

  setCollapsed = () => {
    console.log('setCollapsed');

    if (!this.content) return;

    let internals = this.props.internals ? () => this.props.internals(this.state) : () => {};

    this.setState(
      {
        collapseStyle: {
          maxHeight: '0px',
          visibility: 'hidden',
        },
      },
      internals
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
      let internals = this.props.internals ? () => this.props.internals(this.state) : () => {};

      this.setState(
        {
          collapseStyle: {
            maxHeight: '0px',
            visibility: '',
          },
        },
        internals
      );
    });
  };

  setExpanding = () => {
    console.log('setExpanding');

    nextFrame(() => {
      if (this.content) {
        const maxHeight = this.getHeight();
        let internals = this.props.internals ? () => this.props.internals(this.state) : () => {};

        this.setState(
          {
            collapseStyle: {
              maxHeight,
              visibility: '',
            },
          },
          internals
        );
      }
    });
  };

  setExpanded = () => {
    console.log('setExpanded');

    if (!this.content) return;

    let internals = this.props.internals ? () => this.props.internals(this.state) : () => {};

    this.setState(
      {
        collapseStyle: {
          maxHeight: '',
          visibility: '',
        },
      },
      internals
    );
  };
}

function nextFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
