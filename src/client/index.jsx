import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Routes from './routes';
import configureStore from './redux/configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
