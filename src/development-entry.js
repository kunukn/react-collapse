import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "components/Base/base.scss";
import "components/Collapse/collapse.css";

import App from "components/App/App";
import CollapseClass from "components/Collapse/Collapse.class";
import Collapse from "components/Collapse/Collapse";

ReactDOM.render(
  <StrictMode>
    <>
      <App Collapse={Collapse} />
    </>
  </StrictMode>,
  document.getElementById("root")
);
