import {
  receiveGenres,
  receiveRecommendations,
  requestGenres,
  requestRecommendations,
  setXAxis,
  setYAxis
} from './actions';
import getApiData from '../getApiData';
import {axisCategories} from '../components/Graph/AxisSelects/axisCategories';
import {Stats} from 'fast-stats';
import _ from 'lodash';


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
  if ((recommendations || []).length === 0) {
    return;
  }
  const featureMeanSquaredErrors = Object.keys(axisCategories).reduce((accum, featureKey) => {
    const featureValues = recommendations.map(({features}) => features[featureKey]);
    const mean = new Stats().push(...featureValues).gmean();
    const sumOfMeanSquaredErrors = featureValues.map(x => Math.pow(x - mean, 2)).reduce((sum, curr) => sum + curr, 0);
    return {
      ...accum,
      [featureKey]: sumOfMeanSquaredErrors / featureValues.length
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(Object.entries(featureMeanSquaredErrors), ([_, mse]) => -mse).map(([key, _]) => key);
  dispatch(setXAxis(featuresSortedByMeanSquaredError.shift()));
  dispatch(setYAxis(featuresSortedByMeanSquaredError.shift()));
};