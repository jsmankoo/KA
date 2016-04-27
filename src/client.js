import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Routes from './Routes';

import Styles from '../Stylus/App.styl';

import Store from './Store/Store.js';

ReactDOM.render(
  <Provider store={Store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
