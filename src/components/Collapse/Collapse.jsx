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

  contentRef = React.createRef();

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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.contentRef) return;

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
    const { className, children, transition, isOpen, onRest, ...attrs } = this.props;

    let style = {
      transition,
    };

    return (
      <>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <div
          ref={this.contentRef}
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
    const { onRest, isOpen } = this.props;

    console.log(event.propertyName, event.target === this.contentRef.current);

    if (event.target === this.contentRef.current && event.propertyName === 'max-height') {
      if (isOpen) {
        this.setState({ collapse: EXPANDED });
      } else {
        log('collapsed');
        this.setState({ collapse: COLLAPSED });
      }

      onRest && onRest(this.state);
    }
  };

  getHeight = () => this.contentRef.current.scrollHeight + 'px';

  applyCollapsing = () => {
    let el = this.contentRef.current;
    if (!el) return;

    el.style.maxHeight = this.getHeight();
    nextFrame(() => {
      el.style.maxHeight = 0 + 'px';
    });
  };

  applyCollapsed = () => {
    let el = this.contentRef.current;
    if (!el) return;

    el.style.visibility = 'hidden';
  };

  applyExpanding = () => {
    let el = this.contentRef.current;
    if (!el) return;

    nextFrame(() => {
      el.style.maxHeight = this.getHeight();
      this.contentRef.style.visibility = '';
    });
  };

  applyExpanded = () => {
    let el = this.contentRef.current;
    if (!el) return;

    el.style.maxHeight = '';
  };
}

function rAF(callback) {
  requestAnimationFrame(callback);
}

function nextFrame(callback) {
  rAF(_ => rAF(callback));
}
