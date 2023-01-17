import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "~/dist/Collapse.umd.css";
import "components/base/base.scss";

import App from "components/app/App";
import Collapse from "~/dist/Collapse.umd.js";

const root = createRoot(document.getElementById("root"));

let RequireCollapse = require("~/dist/Collapse.umd.js");

root.render(
  <StrictMode>
    <App display="validate" Collapse={Collapse} Collapse2={RequireCollapse} />
  </StrictMode>
);
