import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AxisSelect from './AxisSelect';
import {setXAxis, setYAxis} from '../../../redux/actions';
import {suggestAxes} from '../../../redux/actionCreators';
import SuggestAxesButton from './SuggestAxesButton';

const AxisSelects = ({xAxis, yAxis, setXAxis, setYAxis, recommendations, suggestAxes}) => {
  useEffect(() => {
    if (!(xAxis && yAxis)) {
      suggestAxes(recommendations);
    }
  }, [recommendations]);
  return (
    <>
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
      <div className={'row pt-4'}>
        <div className={'col-sm-4 offset-sm-4'}>
          <SuggestAxesButton/>
        </div>
      </div>
    </>
  );
};

AxisSelects.propTypes = {
  setXAxis: PropTypes.func,
  setYAxis: PropTypes.func,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string,
  recommendations: PropTypes.arrayOf(PropTypes.object),
  suggestAxes: PropTypes.func
};

const mapStateToProps = ({xAxis, yAxis, recommendations}) => ({
  xAxis,
  yAxis,
  recommendations
});

const mapDispatchToProps = dispatch => ({
  setXAxis: (category) => dispatch(setXAxis(category)),
  setYAxis: (category) => dispatch(setYAxis(category)),
  suggestAxes: (recommendations) => suggestAxes(recommendations)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AxisSelects);