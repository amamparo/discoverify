import {receiveTopArtists, requestTopArtists} from './actions';
import getSpotifyData from '../getSpotifyData';


export const getTopArtists = dispatch => getSpotifyData({
  dispatch,
  requestAction: requestTopArtists,
  receiveAction: receiveTopArtists,
  endpoint: '/v1/me/top/artists',
  params: {
    limit: 50,
    time_range: 'medium_term'
  },
  formatResponse: ({items}) => items
});