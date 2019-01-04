import './app.scss';
import React from 'react';
import Collapse from 'components/Collapse/Collapse';

const log = console.log.bind(console);

export default class App extends React.Component {
  state = { isOpen1: false, isOpen2: false, isOpen3: false, isOpen4: true };

  render() {
    return (
      <div className="app">
        <button className="app__toggle" onClick={() => this.toggle(1)}>
          toggle
        </button>
        <pre style={{ fontSize: '10px' }}>{JSON.stringify(this.state.spy1, null, 2)}</pre>
        <Collapse
          isOpen={this.state.isOpen1}
          onComplete={state => log('callback ' + state)}
          internals={data => this.setState({ spy1: data })}
        >
          <div className="app__content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. <button>click</button>
          </div>
        </Collapse>

        <button className="app__toggle" onClick={() => this.toggle(2)}>
          toggle
        </button>

        <Collapse
          isOpen={this.state.isOpen2}
          onComplete={state => log('callback ' + state)}
          render={collapse => (
            <div className="app__content">
              <div>{JSON.stringify(collapse)}</div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. <button>click</button>
            </div>
          )}
        />

        <button className="app__toggle" onClick={() => this.toggle(3)}>
          toggle
        </button>

        <Collapse
          isOpen={this.state.isOpen3}
          onComplete={state => log('callback ' + state)}
          render={collapse => (
            <div className="app__content">
              <div>{JSON.stringify(collapse)}</div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. <button>click</button>
            </div>
          )}
        />
      </div>
    );
  }

  toggle = index => {
    let collapse = 'isOpen' + index;

    this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
  };
}
