import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const ApexChart = ({genreFilter, xAxis, yAxis}) => {
  return (<div className={'card p-4'} />);
};

ApexChart.propTypes = {
  genreFilter: PropTypes.string,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({genreFilter, xAxis, yAxis}) => ({
  genreFilter,
  xAxis,
  yAxis
});

export default connect(mapStateToProps)(ApexChart);