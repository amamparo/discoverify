import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getRecommendations} from '../../redux/actionCreators';

const Graph = ({featureFilters, genreFilter, getRecommendations, recommendations}) => {
  useEffect(() => {
    if (genreFilter) {
      getRecommendations(genreFilter, featureFilters);
    }
  }, [genreFilter, featureFilters]);
  return (<div className={'card p-4'}>
    {JSON.stringify(recommendations, null, 2)}
  </div>);
};

Graph.propTypes = {
  featureFilters: PropTypes.object,
  genreFilter: PropTypes.string,
  getRecommendations: PropTypes.func,
  recommendations: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({featureFilters, genreFilter, recommendations}) => ({
  genreFilter,
  featureFilters,
  recommendations
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: (genre, featureFilters) => getRecommendations(genre, featureFilters)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);