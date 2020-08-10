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
  const benchmarkTrack = recommendations.find(r => r.isBenchmarkTrack);
  const featureOptimalnesses = Object.keys(axisCategories).reduce((accum, featureKey) => {
    const featureValues = recommendations.map(({features}) => features[featureKey]);
    const benchmarkValue = benchmarkTrack.features[featureKey];
    const range = Math.max(featureValues) - Math.min(featureValues);
    const middleValue = range / 2;
    const distanceFromBenchmarkValue = Math.abs(benchmarkValue - middleValue);
    return {
      ...accum,
      [featureKey]: 1 - (distanceFromBenchmarkValue/range)
    };
  }, {});
  const featuresSortedByMeanSquaredError = _.sortBy(
    Object.entries(featureOptimalnesses),
    ([_, optimalness]) => -optimalness
  ).map(([key, _]) => key);
  return [featuresSortedByMeanSquaredError.shift(), featuresSortedByMeanSquaredError.shift()];
};