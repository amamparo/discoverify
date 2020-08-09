import React from 'react';
import {Cookies} from 'react-cookie';
import {COOKIE_TOKEN_KEY} from '../../constants';
import promptUserForAuthentication from '../../promptUserForAuthentication';

export default WrappedComponent => {
  return props => {
    const cookies = new Cookies();
    const code = cookies.get(COOKIE_TOKEN_KEY);
    if (code) {
      return <WrappedComponent {...props} spotifyAuthCode={code}/>;
    }
    return promptUserForAuthentication();
  }
}