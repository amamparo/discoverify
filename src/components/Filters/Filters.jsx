import React from 'react';
import GenreFilter from './GenreFilter';
import FeatureFilters from './FeatureFilters/FeatureFilters';

const Filters = () => {
  return (
    <>
      <div className={'card p-3'}>
        <GenreFilter/>
      </div>
      <div className={'card p-4 mt-4'}>
        <FeatureFilters/>
      </div>
    </>
  );
};

Filters.propTypes = {};

export default Filters;