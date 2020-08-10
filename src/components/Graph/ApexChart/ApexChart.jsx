import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import _ from 'lodash';
import {getRecommendations} from '../../../redux/actionCreators';
import getChartOptions from './getChartOptions';
import './ApexChart.scss';
import {setNowPlaying} from '../../../redux/actions';

const ApexChart = ({benchmarkTrack, featureFilters, getRecommendations, recommendations, xAxis, yAxis, setNowPlaying}) => {
  useEffect(() => {
    if (benchmarkTrack && featureFilters && getRecommendations) {
      getRecommendations(benchmarkTrack, featureFilters);
    }
  }, [benchmarkTrack, featureFilters, getRecommendations]);
  
  const chartRef = useRef(null);
  
  const [chartWidth, setChartWidth] = useState(0);
  
  useEffect(() => {
    setChartWidth(chartRef.current ? chartRef.current.clientWidth : chartWidth);
  }, [chartRef]);
  
  const getTooltip = ({dataPointIndex, seriesIndex, w: {config: {series}}}) => {
    const track = series[seriesIndex].data[dataPointIndex];
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
  
  const data = benchmarkTrack && featureFilters && xAxis && yAxis ? recommendations.map(r => ({
    ...r,
    x: r.features[xAxis],
    y: r.features[yAxis]
  })) : [];
  
  const onMouseEnter = (event, ctx, {dataPointIndex, seriesIndex, w: {config: {series}}}) => {
    setNowPlaying(series[seriesIndex].data[dataPointIndex]);
  }
  const onMouseLeave = () => {
    setNowPlaying(null);
  }
  const onMarkerClick = (event, ctx, {dataPointIndex, seriesIndex, w: {config: {series}}}) => {
    const track = series[seriesIndex].data[dataPointIndex];
    window.open(track.external_urls.spotify, 'spotify');
    setNowPlaying(null);
  }
  
  return (<div id={'chart'} ref={chartRef}>
    <ReactApexChart type={'scatter'}
                    options={
                      getChartOptions({
                        getTooltip,
                        onMouseEnter,
                        onMouseLeave,
                        onMarkerClick,
                        xMin: _.min(data.map(({x}) => x)),
                        xMax: _.max(data.map(({x}) => x)),
                        yMin: _.min(data.map(({y}) => y)),
                        yMax: _.max(data.map(({y}) => y))
                      })
                    }
                    height={Math.max(chartWidth, 350)}
                    series={
                      data && data.length > 0 ?
                        [false, true]
                          .map(isBenchmarkTrack => ({data: data.filter(d => d.isBenchmarkTrack === isBenchmarkTrack)}))
                        : []
                    }/>
  </div>);
};

ApexChart.propTypes = {
  benchmarkTrack: PropTypes.object,
  getRecommendations: PropTypes.func,
  featureFilters: PropTypes.object,
  recommendations: PropTypes.arrayOf(PropTypes.object),
  setNowPlaying: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({benchmarkTrack, featureFilters, recommendations = [], xAxis, yAxis}) => ({
  benchmarkTrack,
  featureFilters,
  recommendations,
  xAxis,
  yAxis
});

const mapDispatchToProps = dispatch => ({
  getRecommendations: (benchmarkTrack, featureFilters) => getRecommendations(dispatch)(benchmarkTrack, featureFilters),
  setNowPlaying: (track) => dispatch(setNowPlaying(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(ApexChart);