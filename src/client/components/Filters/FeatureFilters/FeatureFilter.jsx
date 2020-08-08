import React, {useEffect, useState} from 'react';
import {Range} from 'rc-slider';
import 'rc-slider/assets/index.css';
import {connect} from 'react-redux';
import {setFeatureFilter} from '../../../redux/actions';
import PropTypes from 'prop-types';
import './FeatureFilter.scss';

const FeatureFilters = ({featureName, featureKey, setFilter}) => {
  const defaultMin = 0;
  const defaultMax = 1;
  const [minMax, setMinMax] = useState([defaultMin, defaultMax]);
  useEffect(() => {
    const [min, max] = minMax;
    setFilter(featureKey, min, max);
  }, [minMax]);
  return (<div className={'feature-filter'}>
    <div className={'feature-label'}>
      <span>{featureName}</span>
    </div>
    <Range min={defaultMin} max={defaultMax} step={0.01} defaultValue={[defaultMin, defaultMax]} allowCross
           onAfterChange={setMinMax}/>
  </div>);
};

FeatureFilters.propTypes = {
  featureName: PropTypes.string.isRequired,
  featureKey: PropTypes.string.isRequired,
  setFilter: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setFilter: (key, min, max) => dispatch(setFeatureFilter(key, min, max))
});

export default connect(null, mapDispatchToProps)(FeatureFilters);