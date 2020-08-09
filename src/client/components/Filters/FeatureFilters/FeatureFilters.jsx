import React from 'react';
import 'rc-slider/assets/index.css';
import FeatureFilter from './FeatureFilter';
import ResetFiltersButton from './ResetFiltersButton';

const FeatureFilters = () => {
  return (<div className={'feature-filters'}>
    <FeatureFilter featureName={'Acousticness'} featureKey={'acousticness'}/>
    <FeatureFilter featureName={'Danceability'} featureKey={'danceability'}/>
    <FeatureFilter featureName={'Energy'} featureKey={'energy'}/>
    <FeatureFilter featureName={'Instrumentalness'} featureKey={'instrumentalness'}/>
    <FeatureFilter featureName={'Liveness'} featureKey={'liveness'}/>
    <FeatureFilter featureName={'Speechiness'} featureKey={'speechiness'}/>
    <FeatureFilter featureName={'Happiness'} featureKey={'valence'}/>
    <div className={'row pt-2'}>
      <div className={'col-sm-8 offset-sm-2'}>
        <ResetFiltersButton/>
      </div>
    </div>
  </div>);
};

FeatureFilters.propTypes = {};

export default FeatureFilters;