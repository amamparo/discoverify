import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AxisSelect from './AxisSelect';
import {setXAxis, setYAxis} from '../../../redux/actions';

const AxisSelects = ({xAxis, yAxis, setXAxis, setYAxis}) => {
  return (
    <div className={'row'}>
      <div className={'col-sm-6'}>
        <AxisSelect label={'Y Axis'} setAxis={setYAxis} current={yAxis}/>
      </div>
      <div className={'col-sm-6'}>
        <AxisSelect label={'X Axis'} setAxis={setXAxis} current={xAxis}/>
      </div>
    </div>
  );
};

AxisSelects.propTypes = {
  setXAxis: PropTypes.func,
  setYAxis: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({xAxis, yAxis}) => ({
  xAxis,
  yAxis
});

const mapDispatchToProps = dispatch => ({
  setXAxis: (category) => dispatch(setXAxis(category)),
  setYAxis: (category) => dispatch(setYAxis(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(AxisSelects);