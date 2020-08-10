import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AxisSelect from './AxisSelect';
import {setXAxis, setYAxis} from '../../../redux/actions';
import {suggestAxes} from '../../../redux/actionCreators';

const AxisSelects = ({xAxis, yAxis, setXAxis, setYAxis, recommendations, suggestAxes, benchmarkTrack}) => {
  const [currentBenchmarkTrack, setCurrentBenchmarkTrack] = useState(benchmarkTrack);
  useEffect(() => setCurrentBenchmarkTrack(benchmarkTrack), [benchmarkTrack]);
  useEffect(() => suggestAxes(recommendations), [currentBenchmarkTrack]);
  return (
    <div className={'row'}>
      {
        [['Y Axis', setYAxis, yAxis], ['X Axis', setXAxis, xAxis]].map(([label, setAxis, axis]) => {
          return (
            <div key={label} className={'col-sm-6'}>
              <AxisSelect label={label} setAxis={setAxis} current={axis}/>
            </div>
          );
        })
      }
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