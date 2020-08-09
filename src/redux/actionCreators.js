import {
  receiveGenres,
  receiveRecommendations,
  requestGenres,
  requestRecommendations,
  setXAxis,
  setYAxis
} from './actions';
import {getOptimalCategories} from '../components/Graph/AxisSelects/axisCategories';
import apiGetGenres from '../api/getGenres';
import apiGetRecommendations from '../api/getRecommendations';

export const getGenres = dispatch => async () => {
  dispatch(requestGenres());
  dispatch(receiveGenres(await apiGetGenres()));
}

export const getRecommendations = dispatch => async (genre, featureFilters) => {
  dispatch(requestRecommendations());
  dispatch(receiveRecommendations(await apiGetRecommendations(genre, featureFilters)));
}

export const suggestAxes = (recommendations) => dispatch => {
  const optimalCategories = getOptimalCategories(recommendations);
  if (optimalCategories.length < 2) {
    return;
  }
  dispatch(setXAxis(optimalCategories[0]));
  dispatch(setYAxis(optimalCategories[1]));
};