import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';

import App from 'components/App/App';
import Collapse from 'root/dist/Collapse.js';
let RequireCollapse = require('root/dist/Collapse.js');

ReactDOM.render(
  <StrictMode>
    <App Collapse={Collapse} Collapse2={RequireCollapse} />
  </StrictMode>,
  document.getElementById('root')
);
