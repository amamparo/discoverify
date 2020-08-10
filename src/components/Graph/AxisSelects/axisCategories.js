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
  const featureRanges = Object.keys(axisCategories).reduce((accum, featureKey) => {
    const featureValues = recommendations.map(({features}) => features[featureKey]);
    return {
      ...accum,
      [featureKey]: Math.abs(Math.max(featureValues) - Math.min(featureValues))
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(Object.entries(featureRanges), ([_, rng]) => rng).map(([key, _]) => key);
  return [featuresSortedByMeanSquaredError.shift(), featuresSortedByMeanSquaredError.shift()];
};