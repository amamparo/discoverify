import axios from 'axios';
import {Cookies} from 'react-cookie';
import {COOKIE_TOKEN_KEY} from './constants';
import _ from 'lodash';
import promptUserForAuthorization from './components/Authorize/promptUserForAuthorization';

export default async ({
                  dispatch,
                  requestAction,
                  receiveAction,
                  endpoint,
                  params = {},
                  formatResponse = _.identity
                }) => {
  dispatch(requestAction());
  dispatch(receiveAction(formatResponse(await get({endpoint, params}))));
};

const get = ({endpoint, params = {}}) => {
  const errorHandler = ({response: {status}}) => {
    const isUnauthorized = status === 401;
    if (isUnauthorized) {
      promptUserForAuthorization();
    }
  };
  
  return new Promise(resolve => axios({
    method: 'get',
    url: `https://api.spotify.com${endpoint}`,
    params,
    headers: {Authorization: `Bearer ${new Cookies().get(COOKIE_TOKEN_KEY)}`}
  }).then(({data}) => resolve(data), errorHandler));
}