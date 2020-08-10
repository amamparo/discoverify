import {
  receiveRecommendations,
  requestRecommendations,
  setXAxis,
  setYAxis
} from './actions';
import {getOptimalCategories} from '../components/Graph/AxisSelects/axisCategories';
import apiGetRecommendations from '../api/getRecommendations';

export const getRecommendations = dispatch => async (benchmarkTrackId, featureFilters) => {
  dispatch(requestRecommendations());
  dispatch(receiveRecommendations(await apiGetRecommendations(benchmarkTrackId, featureFilters)));
}

export const suggestAxes = (recommendations) => dispatch => {
  const optimalCategories = getOptimalCategories(recommendations);
  if (optimalCategories.length < 2) {
    return;
  }
  dispatch(setXAxis(optimalCategories[0]));
  dispatch(setYAxis(optimalCategories[1]));
};