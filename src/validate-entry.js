import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';

import App from 'components/App/App';
import Collapse from 'root/dist/Collapse.js';
import CollapseCjs from 'root/dist/Collapse.cjs.js';
let RequireCollapse = require('root/dist/Collapse.js');
let RequireCollapseCjs = require('root/dist/Collapse.cjs.js');

ReactDOM.render(
  <StrictMode>
    <App Collapse={Collapse} Collapse2={CollapseCjs} Collapse3={RequireCollapse} Collapse4={RequireCollapseCjs} />
  </StrictMode>,
  document.getElementById('root')
);
