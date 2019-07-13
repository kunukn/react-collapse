import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "components/base/base.scss";
import "components/collapse/collapse.css";

import App from "components/App/App";
import CollapseClass from "components/collapse/Collapse.class";
import Collapse from "components/collapse/Collapse";

ReactDOM.render(
  <StrictMode>
    <>
      <App Collapse={Collapse} />
    </>
  </StrictMode>,
  document.getElementById("root")
);
