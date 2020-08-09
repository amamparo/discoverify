import React, {useEffect, useState} from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {connect} from 'react-redux';
import {setFeatureFilter} from '../../../redux/actions';
import PropTypes from 'prop-types';
import './FeatureFilter.scss';

const FeatureFilters = ({featureName, featureKey, setFilter, featureFilters}) => {
  const defaultMin = 0;
  const defaultMax = 1;
  const minKey = `min_${featureKey}`;
  const maxKey = `max_${featureKey}`;
  const [minMax, setMinMax] = useState([featureFilters[minKey] || defaultMin, featureFilters[maxKey] || defaultMax]);
  return (
    <div className={'feature-filter'}>
      <div className={'feature-label'}>
        <strong>{featureName}</strong>
      </div>
      <Range min={defaultMin} max={defaultMax} step={0.01} value={minMax} allowCross
             onChange={setMinMax}
             onAfterChange={([min, max]) => setFilter(featureKey, min, max)}/>
    </div>
  );
};

FeatureFilters.propTypes = {
  featureName: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  setFilter: PropTypes.func,
  featureFilters: PropTypes.object
};

FeatureFilters.defaultProps = {
  featureFilters: {}
};

const mapStateToProps = ({featureFilters}) => ({
  featureFilters
});

const mapDispatchToProps = dispatch => ({
  setFilter: (key, min, max) => dispatch(setFeatureFilter(key, min, max))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeatureFilters);