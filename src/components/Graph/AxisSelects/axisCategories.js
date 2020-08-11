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
    const stats = new Stats().push(featureValues);
    const mean = stats.amean();
    const stddev = stats.stddev();
    const zScores = featureValues.map(x => Math.abs(x - mean) / stddev);
    const maxZScore = Math.max(...zScores);
    return {
      ...accum,
      [featureKey]: -maxZScore
    };
  }, {});
  const featuresSortedByOptimalness = _.sortBy(
    Object.entries(featureOptimalnesses),
    ([_, optimalness]) => optimalness
  ).map(([key, _]) => key).reverse();
  return featuresSortedByOptimalness.slice(0, 2);
};