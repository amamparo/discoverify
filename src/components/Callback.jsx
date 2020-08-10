import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import {withCookies} from 'react-cookie';
import {Redirect} from 'react-router-dom';
import {COOKIE_TOKEN_KEY} from '../constants';

const Callback = ({location, cookies}) => {
  const {hash} = location;
  cookies.set(COOKIE_TOKEN_KEY, qs.parse(hash.replace('#', '')).access_token);
  return <Redirect to={'/'}/>;
};

Callback.propTypes = {
  cookies: PropTypes.object,
  location: PropTypes.object
};

export default withCookies(Callback);