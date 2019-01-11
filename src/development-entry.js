import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';
import 'components/Collapse/collapse.scss';
import App from 'components/App/App';

// import testES8 from './test-es8';
//testES8();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
