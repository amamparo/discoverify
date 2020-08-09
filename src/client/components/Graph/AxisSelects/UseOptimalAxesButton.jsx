import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {suggestAxes} from '../../../redux/actionCreators';
import {getOptimalCategories} from './axisCategories';

const UseOptimalAxesButton = ({recommendations, suggestAxes, xAxis, yAxis}) => {
  const [optimalCategories, setOptimalCategories] = useState([]);
  useEffect(() => {
    setOptimalCategories(getOptimalCategories(recommendations));
  }, [recommendations]);
  const categoriesCanBeOptimized = recommendations.length > 0 && (!optimalCategories.includes(xAxis) || !optimalCategories.includes(yAxis));
  return (
    <button type='button' className={`btn btn-primary btn-block ${categoriesCanBeOptimized ? '' : 'disabled'}`}
            onClick={() => suggestAxes(recommendations)}>
      {'Use Optimal Axes'}
    </button>
  );
};

UseOptimalAxesButton.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
  suggestAxes: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({recommendations = [], xAxis, yAxis}) => ({
  recommendations,
  xAxis,
  yAxis
});

const mapDispatchToProps = dispatch => ({
  suggestAxes: (recommendations) => suggestAxes(recommendations)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UseOptimalAxesButton);