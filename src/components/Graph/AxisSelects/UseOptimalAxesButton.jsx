import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {suggestAxes} from '../../../redux/actionCreators';
import {getOptimalCategories} from './axisCategories';
import './UseOptimalAxesButton.scss';

const UseOptimalAxesButton = ({recommendations, suggestAxes, xAxis, yAxis}) => {
  const [optimalCategories, setOptimalCategories] = useState([]);
  useEffect(() => {
    setOptimalCategories(getOptimalCategories(recommendations));
  }, [recommendations]);
  const categoriesCanBeOptimized = recommendations.length > 0 && _.intersection(optimalCategories, [xAxis, yAxis]).length < 2;
  return (
    <button type='button' className={`use-optimal-axes btn btn-primary btn-block ${categoriesCanBeOptimized ? '' : 'disabled'}`}
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