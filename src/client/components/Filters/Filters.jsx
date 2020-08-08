import React from 'react';
import GenreFilter from './GenreFilter';
import FeatureFilters from './FeatureFilters/FeatureFilters';

const Filters = () => {
  return (<div className={'card p-4'}>
    <GenreFilter/>
    <FeatureFilters/>
  </div>);
};

Filters.propTypes = {};

export default Filters;