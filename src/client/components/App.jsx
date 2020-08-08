import React from 'react';
import requireAuthorization from './Authorize/requireAuthorization';
import './App.scss';
import Filters from './Filters/Filters';
import Graph from './Graph/Graph';

const App = () => {
  return (
    <div className={'container-fluid'}>
      <div className={'row'}>
        <div className={'col-sm-2 offset-sm-2'}>
          <Filters/>
        </div>
        <div className={'col-sm-5'}>
          <Graph/>
        </div>
      </div>
    </div>
  );
};

App.propTypes = {};


export default requireAuthorization(App);