import {Stats} from 'fast-stats';
import _ from 'lodash';

export const axisCategories = {
  acousticness: 'Acousticness',
  danceability: 'Danceability',
  energy: 'Energy',
  instrumentalness: 'Instrumentalness',
  liveness: 'Liveness',
  speechiness: 'Speechiness',
  valence: 'Happiness'
};

export const getOptimalCategories = (recommendations) => {
  if ((recommendations || []).length === 0) {
    return [];
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
  return [featuresSortedByMeanSquaredError.shift(), featuresSortedByMeanSquaredError.shift()];
};