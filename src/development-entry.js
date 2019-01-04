import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import 'components/Base/base.scss';
import App from 'components/App/App';
import Collapse from 'components/Collapse/Collapse';

// import testES8 from './test-es8';
//testES8();

ReactDOM.render(
  <StrictMode>
    <App>
      <Collapse>something</Collapse>
    </App>
  </StrictMode>,
  document.getElementById('root')
);
