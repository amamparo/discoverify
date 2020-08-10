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

const fetchSpotifyData = (endpoint, params = {}) => new Promise((resolve, reject) => axios({
  method: 'get',
  url: `https://api.spotify.com${endpoint}`,
  params,
  headers: {Authorization: `Bearer ${new Cookies().get(COOKIE_TOKEN_KEY)}`}
}).then(
  ({data}) => resolve(data),
  ({response: {status, data}}) => reject([401, 403].includes(status) ? new SpotifyUnauthorizedError() : new Error(data))
));

export default async (endpoint, params = {}) => {
  try {
    return await fetchSpotifyData(endpoint, params);
  } catch (err) {
    if (err.constructor === SpotifyUnauthorizedError) {
      return promptForUserAuthentication();
    }
    throw err;
  }
};