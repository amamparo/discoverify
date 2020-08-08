import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {getRecommendations} from '../../redux/actionCreators';

const ApexChart = ({genreFilter, featureFilters, getRecommendations, recommendations, xAxis, yAxis}) => {
  useEffect(() => {
    if (genreFilter && featureFilters && getRecommendations) {
      getRecommendations(genreFilter, featureFilters);
    }
  }, [genreFilter, featureFilters, getRecommendations]);
  return (<div>
    {
      recommendations &&
      <ReactApexChart type={'scatter'}
                      options={{}}
                      series={[{data: recommendations.map(({features}) => [features[xAxis], features[yAxis]])}]}/>
    }
  </div>);
};

ApexChart.propTypes = {
  genreFilter: PropTypes.string,
  getRecommendations: PropTypes.func,
  featureFilters: PropTypes.object,
  recommendations: PropTypes.arrayOf(PropTypes.object),
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({genreFilter, featureFilters, recommendations, xAxis, yAxis}) => ({
  genreFilter,
  featureFilters,
  recommendations,
  xAxis,
  yAxis
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: (genre, featureFilters) => getRecommendations(genre, featureFilters)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ApexChart);