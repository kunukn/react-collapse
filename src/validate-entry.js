import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';

import App from 'components/App/App';
import Collapse from 'root/dist/Collapse.js';
import CollapseUmd from 'root/dist/Collapse.umd.js';
let RequireCollapse = require('root/dist/Collapse.js');
let RequireCollapseUmd = require('root/dist/Collapse.umd.js');

console.log(Collapse);
console.log(CollapseUmd);

ReactDOM.render(
  <StrictMode>
    <App Collapse={Collapse} Collapse2={CollapseUmd} Collapse3={RequireCollapse} Collapse4={RequireCollapseUmd} />
  </StrictMode>,
  document.getElementById('root')
);
