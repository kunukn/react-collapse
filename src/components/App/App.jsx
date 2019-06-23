import './app.scss';
import React, { Fragment } from 'react';
import cx from 'classnames';

let App = props => {
  let [state, updateState] = React.useState({
    isOpen1: true,
    isOpen2: false,
    isOpen3: false,
    isOpen4: false,
    spy3: {}
  });

  let setState = data => updateState(s => ({ ...s, ...data }));

  React.useEffect(() => {
    setTimeout(() => setState({ transitionEnabled: true }), 50);
  }, []);

  let toggle = index => {
    const collapse = `isOpen${index}`;

    setState({ [collapse]: !state[collapse] });
  };

  let C = props.Collapse;
  let C2 = props.Collapse2 ? props.Collapse2 : C;
  let C3 = props.Collapse3 ? props.Collapse3 : C;
  let C4 = props.Collapse4 ? props.Collapse4 : C;

  return (
    <div className={cx('app', { 'app--transition-enabled': state.transitionEnabled })}>
      <button className={cx('app__toggle', { 'app__toggle--active': state.isOpen1 })} onClick={() => toggle(1)}>
        <span className="app__toggle-text">toggle</span>
        <div className="rotate90">
          <svg className={cx('icon', { 'icon--expanded': state.isOpen1 })} viewBox="6 0 12 24">
            <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
          </svg>
        </div>
      </button>
      <C
        style={{ outline: '1px dashed lightblue' }}
        isOpen={state.isOpen1}
        onChange={data => console.log('onChange', data)}
        elementType="article"
        transition="height 280ms ease-in-out"
        className={
          'collapse-css-transition app__collapse app__collapse--gradient' +
          (state.isOpen1 ? ' app__collapse--active' : '')
        }
      >
        <div className="app__content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
          <div className="image-wrapper">
            <img className="image-wrapper__img" alt="random" src="https://source.unsplash.com/user/erondu/500x200" />
          </div>
          <button onClick={() => toggle(1)} className="app__button">
            close
          </button>
        </div>
      </C>

      <button className={cx('app__toggle', { 'app__toggle--active': state.isOpen2 })} onClick={() => toggle(2)}>
        toggle
      </button>

      <C2
        isOpen={state.isOpen2}
        className={
          'collapse-css-transition app__collapse app__collapse--gradient ' +
          (state.isOpen2 ? 'app__collapse--active' : '')
        }
        transition="height 800ms cubic-bezier(0.4, 0, 0.2, 1)"
        aria-hidden={state.isOpen2 ? 'false' : 'true'}
        onChange={data => console.log('onChange', data)}
        elementType="article"
        excludeStateCSS
        render={collapseState => (
          <div className="app__content">
            <div>{collapseState}</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
            <div className="image-wrapper">
              <img className="image-wrapper__img" alt="random" src="https://source.unsplash.com/user/erondu/500x200" />
            </div>
            <button onClick={() => toggle(2)} className="app__button">
              close
            </button>
          </div>
        )}
      />

      <button className={cx('app__toggle', { 'app__toggle--active': state.isOpen3 })} onClick={() => toggle(3)}>
        toggle
      </button>

      <pre style={{ fontSize: '10px', width: '100%' }}>{JSON.stringify(state.spy3, null, 1)}</pre>
      <C3
        isOpen={state.isOpen3}
        collapseHeight="60px"
        className={
          'collapse-css-transition app__collapse app__collapse--gradient ' +
          (state.isOpen3 ? 'app__collapse--active' : '')
        }
        onInit={state => setState({ spy3: state })}
        onChange={state => setState({ spy3: state })}
        excludeStateCSS
        render={collapseState => (
          <div className="app__content">
            <div>{collapseState}</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. <a href="/">dummy link</a>
          </div>
        )}
      />

      <button className={cx('app__toggle', { 'app__toggle--active': state.isOpen4 })} onClick={() => toggle(4)}>
        toggle
      </button>

      <C4
        isOpen={state.isOpen4}
        className={
          'collapse-css-transition app__collapse app__collapse--gradient ' +
          (state.isOpen4 ? 'app__collapse--active' : '')
        }
        render={collapseState => (
          <div className="app__content">
            <div>{collapseState}</div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. <a href="/">dummy link</a>
          </div>
        )}
      />

      <p className="app__text">
        Some content below <a href="/">dummy link</a>
      </p>
    </div>
  );
};

export default App;
