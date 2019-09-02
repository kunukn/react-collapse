import React from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "components/base/base.scss";
import "components/app/app.scss";
import "components/collapse/collapse.css";
import CollapseClass from "components/collapse/Collapse.class";
import Collapse from "components/collapse/Collapse";

console.log("WEBPPACK_IS_CLASS_COMPONENT", WEBPPACK_IS_CLASS_COMPONENT);

let App = props => {
  let [state, updateState] = React.useState({
    isOpen1: true,
    spy1: {}
  });

  let mergeState = data => updateState(s => ({ ...s, ...data }));

  React.useEffect(() => {
    setTimeout(() => mergeState({ transitionEnabled: true }), 100);
  }, []);

  let toggle = index => {
    const collapse = `isOpen${index}`;

    mergeState({ [collapse]: !state[collapse] });
  };

  let C = props.Collapse;

  return (
    <>
      <div>{props.display}</div>
      <div
        className={cx(
          "app",
          {
            "app--transition-enabled": state.transitionEnabled
          },
          props.className
        )}
      >
        <button
          className={cx("app__toggle", {
            "app__toggle--active": state.isOpen1
          })}
          onClick={() => toggle(1)}
        >
          <span className="app__toggle-text">toggle {state.spy1.state}</span>
          <div className="rotate90">
            <svg
              className={cx("icon", { "icon--expanded": state.isOpen1 })}
              viewBox="6 0 12 24"
            >
              <polygon points="8 0 6 1.8 14.4 12 6 22.2 8 24 18 12" />
            </svg>
          </div>
        </button>
        <pre style={{ fontSize: "10px", width: "100%" }}>
          {JSON.stringify(state.spy1 || {}, null, 1)}
        </pre>
        <C
          addState
          style={{
            outline: "1px dashed lightblue",
            transitionDuration: "260ms"
          }}
          isOpen={state.isOpen1}
          onChange={props => mergeState({ spy1: props })}
          onInit={({ state, style, node = {} }) => {
            console.log("*** node onInit ***", node.className);
            mergeState({ spy1: { state, style } });
          }}
          overflowOnExpanded
          elementType="article"
          transition="height 290ms ease-in-out"
          className={cx(
            "collapse-css-transition",
            " app__collapse",
            " app__collapse--gradient",
            { "app__collapse--active": state.isOpen1 }
          )}
        >
          {collapseState => (
            <div className={cx("app__content", collapseState)}>
              {collapseState} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
              <div className="image-wrapper">
                <img
                  className="image-wrapper__img"
                  alt="random"
                  src="https://source.unsplash.com/user/erondu/500x200"
                />
              </div>
              <button onClick={() => toggle(1)} className="app__button">
                close
              </button>
            </div>
          )}
        </C>

        <p className="app__text">
          Some content below <a href="/">dummy link</a>
        </p>
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App
      display="development"
      className={
        WEBPPACK_IS_CLASS_COMPONENT
          ? "collapse-css-transition is-class-component"
          : null
      }
      Collapse={WEBPPACK_IS_CLASS_COMPONENT ? CollapseClass : Collapse}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
