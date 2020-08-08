import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import {getRecommendations} from '../../../redux/actionCreators';
import getOptions from './getOptions';

const ApexChart = ({genreFilter, featureFilters, getRecommendations, recommendations, xAxis, yAxis}) => {
  useEffect(() => {
    if (genreFilter && featureFilters && getRecommendations) {
      getRecommendations(genreFilter, featureFilters);
    }
  }, [genreFilter, featureFilters, getRecommendations]);
  
  const chartRef = useRef(null);
  
  const [chartWidth, setChartWidth] = useState(0);
  
  useEffect(() => {
    setChartWidth(chartRef.current ? chartRef.current.clientWidth : chartWidth);
  }, [chartRef])
  
  const getTooltip = ({seriesIndex, dataPointIndex}) => {
    return `
      <div>
        <div>${seriesIndex}</div>
        <div>${dataPointIndex}</div>
      </div>
    `;
  }
  
  const allFiltersSet = genreFilter && featureFilters && xAxis && yAxis;
  const noDataMessage = allFiltersSet ? '' : 'Select a genre, x-axis, and y-axis to begin';
  const data = allFiltersSet ? recommendations.map(({features}) => [features[xAxis], features[yAxis]]) : [];
  return (<div ref={chartRef}>
    <ReactApexChart type={'scatter'}
                    options={getOptions({getTooltip, noDataMessage})}
                    height={chartWidth}
                    series={[{data}]}/>
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

const mapStateToProps = ({genreFilter, featureFilters, recommendations = [], xAxis, yAxis}) => ({
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