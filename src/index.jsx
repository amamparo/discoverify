import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Routes from './routes';
import configureStore from './redux/configureStore';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <Routes/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
