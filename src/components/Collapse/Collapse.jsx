import './collapse.scss';
import React from 'react';

const COLLAPSED = 1;
const COLLAPSING = 2;
const EXPANDED = 3;
const EXPANDING = 4;

let log = console.log.bind(console);

export default class Collapse extends React.Component {
  state = {
    isOpen: this.props.isOpen,
    collapse: this.props.isOpen ? EXPANDED : COLLAPSED,
  };

  static getDerivedStateFromProps(props, state) {
    if (!state.isOpen && props.isOpen) {
      return {
        collapse: EXPANDING,
        isOpen: props.isOpen,
      };
    }
    if (state.isOpen && !props.isOpen) {
      return {
        collapse: COLLAPSING,
        isOpen: props.isOpen,
      };
    }

    return null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {}

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }

  componentDidMount() {
    if (this.content && this.props.isOpen) {
      this.applyExpanded();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.content) return;

    if (this.state.collapse === EXPANDING && this.state.collapse !== prevState.collapse) {
      this.applyExpanding();
    } else if (this.state.collapse === COLLAPSING && this.state.collapse !== prevState.collapse) {
      this.applyCollapsing();
    } else if (this.state.collapse === EXPANDED && this.state.collapse !== prevState.collapse) {
      this.applyExpanded();
    } else if (this.state.collapse === COLLAPSED && this.state.collapse !== prevState.collapse) {
      this.applyCollapsed();
    }
  }

  componentWillUnmount() {}

  render() {
    const { className, children, transition, isOpen, onComplete, ...attrs } = this.props;

    let style = {
      transition,
    };

    return (
      <>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <div
          ref={element => {
            this.content = element;
          }}
          style={style}
          className={className || 'kn-react-collapse'}
          onTransitionEnd={this.onTransitionEnd}
          {...attrs}
        >
          {children}
        </div>
      </>
    );
  }

  onTransitionEnd = event => {
    log('onTransitionEnd');

    const { onComplete } = this.props;

    if (event.target === this.content && event.propertyName === 'max-height') {
      if (this.state.collapse === EXPANDING) {
        log('expanded');
        this.setState({ collapse: EXPANDED });
      } else if (this.state.collapse === COLLAPSING) {
        log('collapsed');
        this.setState({ collapse: COLLAPSED });
      }

      onComplete && onComplete(this.state);
    }
  };

  getHeight = () => this.content.scrollHeight + 'px';

  applyCollapsing = () => {
    log('applyCollapsing');

    if (!this.content) return;

    this.content.style.maxHeight = this.getHeight();
    nextFrame(() => {
      this.content.style.maxHeight = 0 + 'px';
    });
  };

  applyCollapsed = () => {
    log('applyCollapsed');

    if (!this.content) return;

    this.content.style.visibility = 'hidden';
  };

  applyExpanding = () => {
    log('applyExpanding');

    nextFrame(() => {
      if (this.content) {
        this.content.style.maxHeight = this.getHeight();
        this.content.style.visibility = '';
      }
    });
  };

  applyExpanded = () => {
    log('applyExpanded');

    if (!this.content) return;

    this.content.style.maxHeight = '';
  };
}

function nextFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
