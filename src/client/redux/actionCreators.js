import {
  receiveGenres,
  receiveRecommendations,
  requestGenres,
  requestRecommendations,
  setXAxis,
  setYAxis
} from './actions';
import getApiData from '../getApiData';
import {getOptimalCategories} from '../components/Graph/AxisSelects/axisCategories';


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

export const suggestAxes = (recommendations) => dispatch => {
  const optimalCategories = getOptimalCategories(recommendations);
  if (optimalCategories.length < 2) {
    return;
  }
  dispatch(setXAxis(optimalCategories[0]));
  dispatch(setYAxis(optimalCategories[1]));
};