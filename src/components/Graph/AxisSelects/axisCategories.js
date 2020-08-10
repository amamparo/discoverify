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
    const sortedFeatureValues = featureValues.sort();
    let maxJumpDistance = 0;
    let previousValue = sortedFeatureValues[0];
    sortedFeatureValues.forEach(x => {
      maxJumpDistance = Math.max(maxJumpDistance, x - previousValue);
      previousValue = x;
    });
    const range = Math.max(featureValues) - Math.min(featureValues);
    return {
      ...accum,
      [featureKey]: 1 - (maxJumpDistance / range)
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(
    Object.entries(featureOptimalnesses),
    ([_, optimalness]) => optimalness
  ).map(([key, _]) => key);
  return [featuresSortedByMeanSquaredError.pop(), featuresSortedByMeanSquaredError.pop()];
};