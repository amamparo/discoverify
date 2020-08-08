import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import {getRecommendations} from '../../../redux/actionCreators';
import getChartOptions from './getChartOptions';
import './ApexChart.scss';

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
  }, [chartRef]);
  
  const getTooltip = ({dataPointIndex, w: {config: {series}}}) => {
    const track = series[0].data[dataPointIndex];
    const {album: {images}} = track;
    return `
      <div class="track-tooltip">
        <div class="album-art">
          <img src="${images.length ? _.orderBy(images, ['height'])[0].url : ''}"/>
        </div>
        <div class="details">
          <div><strong>${track.name}</strong></div>
          <div>${track.artists.map(a => a.name).join(', ')}</div>
        </div>
      </div>
    `;
  }
  
  const allFiltersSet = genreFilter && featureFilters && xAxis && yAxis;
  const noDataMessage = allFiltersSet ? '' : 'Select a genre, x-axis, and y-axis to begin';
  const data = allFiltersSet ? recommendations.map(r => ({...r, x: r.features[xAxis], y: r.features[yAxis]})) : [];
  return (<div id={'chart'} ref={chartRef}>
    <ReactApexChart type={'scatter'}
                    options={getChartOptions({getTooltip, noDataMessage})}
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