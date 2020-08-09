import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import {getRecommendations} from '../../../redux/actionCreators';
import getChartOptions from './getChartOptions';
import './ApexChart.scss';
import {setNowPlaying} from '../../../redux/actions';
import Audio from './Audio';

const ApexChart = ({genreFilter, featureFilters, getRecommendations, recommendations, xAxis, yAxis, setNowPlaying}) => {
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
  const noDataMessage = allFiltersSet ? '' : 'Select a genre to begin';
  const data = allFiltersSet ? recommendations.map(r => ({...r, x: r.features[xAxis], y: r.features[yAxis]})) : [];
  
  const onMouseEnter = (event, ctx, {dataPointIndex, w: {config: {series}}}) => {
    setNowPlaying(series[0].data[dataPointIndex]);
  }
  const onMouseLeave = () => {
    setNowPlaying(null);
  }
  
  return (<div id={'chart'} ref={chartRef}>
    <ReactApexChart type={'scatter'}
                    options={
                      getChartOptions({
                        getTooltip,
                        noDataMessage,
                        onMouseEnter,
                        onMouseLeave,
                        xMin: _.min(data.map(({x}) => x)),
                        xMax: _.max(data.map(({x}) => x)),
                        yMin: _.min(data.map(({y}) => y)),
                        yMax: _.max(data.map(({y}) => y))
                      })
                    }
                    height={chartWidth}
                    series={[{data}]}/>
    <Audio/>
  </div>);
};

ApexChart.propTypes = {
  genreFilter: PropTypes.string,
  getRecommendations: PropTypes.func,
  featureFilters: PropTypes.object,
  recommendations: PropTypes.arrayOf(PropTypes.object),
  setNowPlaying: PropTypes.func,
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
  getRecommendations: (genre, featureFilters) => getRecommendations(genre, featureFilters)(dispatch),
  setNowPlaying: (track) => dispatch(setNowPlaying(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApexChart);