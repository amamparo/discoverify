import React from 'react';
import 'rc-slider/assets/index.css';
import FeatureFilter from './FeatureFilter';
import ResetFiltersButton from './ResetFiltersButton';

const FeatureFilters = () => {
  return (
    <div className={'card'}>
      <div className={'card-header'}>
        {'Audio Feature Filters'}
      </div>
      <div className={'card-body'}>
        <div className={'feature-filters'}>
          <div className={'row px-1 pb-1'}>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Acousticness'} featureKey={'acousticness'}/>
            </div>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Danceability'} featureKey={'danceability'}/>
            </div>
          </div>
          <div className={'row px-1 pb-1'}>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Energy'} featureKey={'energy'}/>
            </div>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Instrumentalness'} featureKey={'instrumentalness'}/>
            </div>
          </div>
          <div className={'row px-1 pb-1'}>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Liveness'} featureKey={'liveness'}/>
            </div>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Speechiness'} featureKey={'speechiness'}/>
            </div>
          </div>
          <div className={'row px-1'}>
            <div className={'col-sm-6'}>
              <FeatureFilter featureName={'Happiness'} featureKey={'valence'}/>
            </div>
          </div>
          <div className={'row py-1 mt-3'}>
            <div className={'col-sm-8 offset-sm-2'}>
              <ResetFiltersButton/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

FeatureFilters.propTypes = {};

export default FeatureFilters;