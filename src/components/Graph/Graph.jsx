import React from 'react';
import ApexChart from './ApexChart/ApexChart';
import AxisSelects from './AxisSelects/AxisSelects';
import Card from '../shared/Card';

const Graph = () => {
  return (
    <Card title={'Song Discovery'}>
      <ApexChart/>
      <div className={'row'}>
        <div className={'col-sm-10 offset-sm-1'}>
          <AxisSelects/>
        </div>
      </div>
    </Card>
  );
};

Graph.propTypes = {};

export default Graph;