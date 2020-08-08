import React from 'react';
import ApexChart from './ApexChart/ApexChart';
import AxisSelects from './AxisSelects/AxisSelects';

const Graph = () => {
  return (<div className={'card p-4'}>
    <ApexChart/>
    <div className={'row'}>
      <div className={'col-sm-10 offset-sm-1'}>
        <AxisSelects/>
      </div>
    </div>
  </div>);
};

Graph.propTypes = {};

export default Graph;