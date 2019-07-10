import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';
import 'components/Collapse/collapse.css';

import App from 'components/App/App';
import Collapse from 'components/Collapse/Collapse';
import CollapseHooks from 'components/Collapse/Collapse.hooks';

ReactDOM.render(
  <StrictMode>
    <App Collapse={CollapseHooks} />
  </StrictMode>,
  document.getElementById('root')
);
