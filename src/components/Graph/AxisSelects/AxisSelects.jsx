import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AxisSelect from './AxisSelect';
import {setXAxis, setYAxis} from '../../../redux/actions';
import {suggestAxes} from '../../../redux/actionCreators';

const AxisSelects = ({xAxis, yAxis, setXAxis, setYAxis, recommendations, suggestAxes, benchmarkTrack}) => {
  useEffect(() => suggestAxes(recommendations), [recommendations]);
  return (
    <div className={'row'}>
      <div className={'col-sm-6 pl-0'}>
        <AxisSelect label={'Y Axis'} setAxis={setYAxis} current={yAxis}/>
      </div>
      <div className={'col-sm-6 pr-0'}>
        <AxisSelect label={'X Axis'} setAxis={setXAxis} current={xAxis}/>
      </div>
    </div>
  );
};

AxisSelects.propTypes = {
  setXAxis: PropTypes.func,
  setYAxis: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  benchmarkTrack: PropTypes.object,
  recommendations: PropTypes.arrayOf(PropTypes.object),
  suggestAxes: PropTypes.func
};

const mapStateToProps = ({xAxis, yAxis, recommendations, benchmarkTrack}) => ({
  xAxis,
  yAxis,
  recommendations,
  benchmarkTrack
});

const mapDispatchToProps = dispatch => ({
  setXAxis: (category) => dispatch(setXAxis(category)),
  setYAxis: (category) => dispatch(setYAxis(category)),
  suggestAxes: (recommendations) => suggestAxes(recommendations)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AxisSelects);