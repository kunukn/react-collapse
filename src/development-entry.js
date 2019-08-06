import React from "react";
import ReactDOM from "react-dom";

import "components/base/base.scss";
import "components/collapse/collapse.css";

import App from "components/App/App";
import CollapseClass from "components/collapse/Collapse.class";
import Collapse from "components/collapse/Collapse";

console.log("WEBPPACK_IS_CLASS_COMPONENT", WEBPPACK_IS_CLASS_COMPONENT);

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
