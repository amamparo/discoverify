import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {resetFeatureFilters} from '../../redux/actions';
import './ResetFiltersButton.scss';

const ResetFiltersButton = ({resetFeatureFilters, featureFilters}) => {
  const minValues = Object.keys(featureFilters).filter(k => k.startsWith('min_')).map(k => featureFilters[k]);
  const maxValues = Object.keys(featureFilters).filter(k => k.startsWith('max_')).map(k => featureFilters[k]);
  const thereAreChanges = [...minValues.filter(v => v > 0), ...maxValues.filter(v => v < 1)].length > 0;
  return (
    <button type='button' className={`reset btn btn-primary btn-block ${thereAreChanges ? '' : 'disabled'}`}
            onClick={resetFeatureFilters}>
      {'Reset'}
    </button>
  );
};

ResetFiltersButton.propTypes = {
  resetFeatureFilters: PropTypes.func,
  featureFilters: PropTypes.object
};

const mapStateToProps = ({featureFilters, recommendations = []}) => ({
  recommendations,
  featureFilters
});

const mapDispatchToProps = dispatch => ({
  resetFeatureFilters: () => dispatch(resetFeatureFilters())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetFiltersButton);