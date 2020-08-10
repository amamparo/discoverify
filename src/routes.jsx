import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import App from './components/App';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import {CALLBACK_PATH} from './constants';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={App}/>
      <Route exact path={CALLBACK_PATH} component={Callback}/>
      <Route component={NotFound}/>
    </Switch>
  </BrowserRouter>
);