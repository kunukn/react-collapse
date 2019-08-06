import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import "~/dist/Collapse.umd.css";
import "components/base/base.scss";

import App from "components/app/App";
import Collapse from "~/dist/Collapse.umd.js";
let RequireCollapse = require("~/dist/Collapse.umd.js");

ReactDOM.render(
  <StrictMode>
    <App display="validate" Collapse={Collapse} Collapse2={RequireCollapse} />
  </StrictMode>,
  document.getElementById("root")
);
