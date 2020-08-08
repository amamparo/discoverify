import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ApexChart from './ApexChart';
import AxisSelects from './AxisSelects/AxisSelects';

const Graph = ({genreFilter, xAxis, yAxis}) => {
  return (<div className={'card p-4'}>
    {
      genreFilter && xAxis && yAxis ? <ApexChart/> : <span>{'Select a genre, x-axis, and y-axis to begin'}</span>
    }
    <div className={'row'}>
      <div className={'col-sm-8 offset-sm-2'}>
        <AxisSelects/>
      </div>
    </div>
  </div>);
};

Graph.propTypes = {
  genreFilter: PropTypes.string,
  xAxis: PropTypes.string,
  yAxis: PropTypes.string
};

const mapStateToProps = ({genreFilter, xAxis, yAxis}) => ({
  genreFilter,
  xAxis,
  yAxis
});

export default connect(mapStateToProps)(Graph);