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
  const featureOptimalnesses = Object.keys(axisCategories).reduce((accum, featureKey) => {
    const featureValues = recommendations.map(({features}) => features[featureKey]);
    const range = Math.max(featureValues) - Math.min(featureValues);
    const middleValue = Math.max(featureValues) - (range / 2);
    const maxDistanceFromMiddleValue = Math.max(featureValues.map(x => Math.abs(x - middleValue)));
    return {
      ...accum,
      [featureKey]: 1 - (maxDistanceFromMiddleValue / range)
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(
    Object.entries(featureOptimalnesses),
    ([_, optimalness]) => optimalness
  ).map(([key, _]) => key);
  return [featuresSortedByMeanSquaredError.pop(), featuresSortedByMeanSquaredError.pop()];
};