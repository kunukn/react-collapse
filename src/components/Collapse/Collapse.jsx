import './collapse.scss';
import React from 'react';

export default class Collapse extends React.Component {
  render() {
    return <div className={this.props.className || 'kn-react-collapse'}>{this.props.children}</div>;
  }
}
