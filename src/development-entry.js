import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';

import App from 'components/App/App';

ReactDOM.render(
  <StrictMode>
    <App hooksVersion />
  </StrictMode>,
  document.getElementById('root')
);
