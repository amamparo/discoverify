import React from 'react';
import requireAuthorization from './Authorize/requireAuthorization';
import './App.scss';
import Filters from './Filters/Filters';
import Graph from './Graph/Graph';

const App = () => {
  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-sm-3'}>
          <Filters/>
        </div>
        <div className={'col-sm-9'}>
          <Graph/>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {};


export default requireAuthorization(App);