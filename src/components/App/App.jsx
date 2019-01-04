import './app.scss';
import React from 'react';
import Collapse from 'components/Collapse/Collapse';
export default class App extends React.Component {
  state = { isOpen: true };

  render() {
    return (
      <div className="app">
        <button className="app__toggle" onClick={this.toggle}>
          toggle
        </button>
        <Collapse isOpen={this.state.isOpen}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Collapse>
      </div>
    );
  }

  toggle = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };
}
