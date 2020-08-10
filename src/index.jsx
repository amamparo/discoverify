import React from 'react';
import ReactDOM from 'react-dom';
import {Cookies} from 'react-cookie';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Routes from './routes';
import configureStore from './redux/configureStore';
import {CALLBACK_PATH, COOKIE_TOKEN_KEY} from './constants';
import promptUserForAuthentication from './promptUserForAuthentication';

(() => {
  if (location.pathname !== CALLBACK_PATH && !new Cookies().get(COOKIE_TOKEN_KEY)) {
    promptUserForAuthentication();
  }
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Routes/>
    </Provider>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
})();
