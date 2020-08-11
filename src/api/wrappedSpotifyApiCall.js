import axios from 'axios';
import {Cookies} from 'react-cookie';
import {COOKIE_TOKEN_KEY} from '../constants';
import promptForUserAuthentication from '../promptUserForAuthentication';

class SpotifyUnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

const fetchSpotifyData = (method, endpoint, params = {}, data = null) => new Promise((resolve, reject) => axios({
  method,
  url: `https://api.spotify.com${endpoint}`,
  params,
  headers: {Authorization: `Bearer ${new Cookies().get(COOKIE_TOKEN_KEY)}`},
  data
}).then(
  ({data}) => resolve(data),
  ({response: {status, data}}) => reject([401, 403].includes(status) ? new SpotifyUnauthorizedError() : new Error(data))
));

const request = async (method, endpoint, params = {}, data = null) => {
  try {
    return await fetchSpotifyData(method, endpoint, params, data);
  } catch (err) {
    if (err.constructor === SpotifyUnauthorizedError) {
      return promptForUserAuthentication();
    }
    throw err;
  }
};

export default (endpoint, params = {}) => {
  return request('get', endpoint, params);
};

export const post = (endpoint, data = {}) => {
  return request('post', endpoint, {}, data);
}