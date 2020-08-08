import axios from 'axios';

export class SpotifyUnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ({endpoint, params = {}, token}) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `https://api.spotify.com${endpoint}`,
    params,
    headers: {Authorization: `Bearer ${token}`}
  }).then(
    ({data}) => resolve(data),
    ({response}) => reject(response.status === 401 ? new SpotifyUnauthorizedError() : new Error(response.data))
  )
});

export const getPaginatedData = async ({endpoint, params, token}) => {
  const {limit} = params;
};