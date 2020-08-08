import {receiveGenres, receiveRecommendations, requestGenres, requestRecommendations} from './actions';
import getApiData from '../getApiData';


export const getGenres = dispatch => getApiData({
  dispatch,
  requestAction: requestGenres,
  receiveAction: receiveGenres,
  endpoint: '/genres'
});

export const getRecommendations = (genre, featureFilters) => dispatch => getApiData({
  dispatch,
  requestAction: requestRecommendations,
  receiveAction: receiveRecommendations,
  endpoint: `/recommendations/${genre}`,
  params: {
    featureFilters: JSON.stringify(featureFilters)
  }
});