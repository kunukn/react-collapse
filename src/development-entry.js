import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "components/base/base.scss";
import "components/collapse/collapse.css";

import App from "components/App/App";
import CollapseClass from "components/collapse/Collapse.class";
import Collapse from "components/collapse/Collapse";

console.log("WEBPPACK_IS_CLASS_COMPONENT", WEBPPACK_IS_CLASS_COMPONENT);

ReactDOM.render(
  <StrictMode>
    <>
      <App
        className={WEBPPACK_IS_CLASS_COMPONENT ? "is-class-component" : null}
        Collapse={WEBPPACK_IS_CLASS_COMPONENT ? CollapseClass : Collapse}
      />
    </>
  </StrictMode>,
  document.getElementById("root")
);
