import React from 'react';
import ReactDOM from 'react-dom';
import {Cookies} from 'react-cookie';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import Routes from './components/routes';
import configureStore from './redux/configureStore';
import {CALLBACK_PATH, COOKIE_TOKEN_KEY} from './constants';
import promptUserForAuthentication from './promptUserForAuthentication';
import RollbarWrapper from './components/RollbarWrapper';

(() => {
  if (location.pathname !== CALLBACK_PATH && !new Cookies().get(COOKIE_TOKEN_KEY)) {
    promptUserForAuthentication();
  }
  ReactDOM.render(
    <RollbarWrapper>
      <Provider store={configureStore()}>
        <Routes/>
      </Provider>
    </RollbarWrapper>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
})();
