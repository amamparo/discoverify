import _ from 'lodash';
import {Stats} from 'fast-stats';

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
  const featureOptimalnesses = Object.keys(axisCategories).reduce((accum, featureKey) => {
    const featureValues = recommendations.map(({features}) => features[featureKey]);
    let previousValue = null;
    const jumps = [];
    featureValues.sort().forEach(value => {
      if (previousValue) {
        jumps.push(value - previousValue);
      }
      previousValue = value;
    });
    return {
      ...accum,
      [featureKey]: 1 - new Stats().push(...jumps).stddev()
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(
    Object.entries(featureOptimalnesses),
    ([_, optimalness]) => optimalness
  ).map(([key, _]) => key);
  return [featuresSortedByMeanSquaredError.pop(), featuresSortedByMeanSquaredError.pop()];
};