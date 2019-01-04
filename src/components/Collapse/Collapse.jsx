import './collapse.scss';
import React from 'react';

const COLLAPSED = 1;
const COLLAPSING = 2;
const EXPANDED = 3;
const EXPANDING = 4;

export default class Collapse extends React.Component {
  state = {
    collapse: '',
    style: {},
  };

  contentRef = React.createRef();

  static getDerivedStateFromProps(props, state) {
    if (!this.contentRef) {
      return null;
    }

    if (!this.props.isOpen && props.isOpen) {
      return {
        collapse: EXPANDING,
      };
    } else if (this.props.isOpen && !props.isOpen) {
      return {
        collapse: COLLAPSING,
      };
    }

    return null;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {}

  getSnapshotBeforeUpdate(prevProps, prevState) {}

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {}

  render() {
    const { className, children, isOpen, transition, onRest, ...attrs } = this.props;

    let style = {
      transition,
    };

    return (
      <div
        ref={this.contentRef}
        style={style}
        className={className || 'kn-react-collapse'}
        onTransitionEnd={this.onTransitionEnd}
        {...attrs}
      >
        <>
          <div>{this.props.isOpen}</div>
          {children}
        </>
      </div>
    );
  }

  onTransitionEnd = e => {
    const { onRest, isOpen } = this.props;

    console.log(e.propertyName);

    if (e.target === this.content && e.propertyName === 'max-height') {
      if (isOpen) {
        this.setState({ collapse: EXPANDED });
      } else {
        this.setState({ collapse: COLLAPSED });
      }

      onRest && onRest({ isOpen });
    }
  };

  getHeight = () => (this.content && this.content.scrollHeight) || 0;

  setCollapsing = () => {};

  setCollapsed = () => {
    this.setState(prevState => ({
      style: { ...prevState.style, visibility: 'hidden' },
    }));
  };

  setExpanding = () => {};

  setExpanded = () => {
    this.setState(prevState => ({
      style: { ...prevState.style, maxHeight: '' },
    }));
  };
}

function rAF(callback) {
  requestAnimationFrame(callback);
}

function nextFrame(callback) {
  rAF(_ => rAF(callback));
}
