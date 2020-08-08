import React from 'react';
import 'rc-slider/assets/index.css';
import FeatureFilter from './FeatureFilter';

const FeatureFilters = () => {
  return (<div className={'feature-filters'}>
    <FeatureFilter featureName={'Acousticness'} featureKey={'acousticness'}/>
    <FeatureFilter featureName={'Danceability'} featureKey={'danceability'}/>
    <FeatureFilter featureName={'Energy'} featureKey={'energy'}/>
    <FeatureFilter featureName={'Instrumentalness'} featureKey={'instrumentalness'}/>
    <FeatureFilter featureName={'Liveness'} featureKey={'liveness'}/>
    <FeatureFilter featureName={'Speechiness'} featureKey={'speechiness'}/>
    <FeatureFilter featureName={'Happiness'} featureKey={'valence'}/>
  </div>);
};

FeatureFilters.propTypes = {};

export default FeatureFilters;