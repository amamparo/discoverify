import React from 'react';
import './App.scss';
import Graph from './Graph/Graph';
import BenchmarkTrack from './BenchmarkTrack/BenchmarkTrack';
import FeatureFilters from './FeatureFilters/FeatureFilters';
import Audio from './Graph/ApexChart/AudioPlayer';
import Playlist from './Playlist/Playlist';

const App = () => {
  return (
    <>
      <div className={'container p-4'}>
        <div className={'inner-container col-sm-10'}>
          <div className={'row'}>
            <div className={'col-sm-5 pr-0'}>
              <div className={'pb-2'}>
                <BenchmarkTrack/>
              </div>
              <div className={'pt-2'}>
                <FeatureFilters/>
              </div>
            </div>
            <div className={'col-sm-7'}>
              <Graph/>
            </div>
          </div>
          <div className={'row pt-3'}>
            <div className={'col-sm-12'}>
              <Playlist/>
            </div>
          </div>
          <div className={'footer text-center pt-4'}>
            {`Copyright © ${(new Date().getFullYear())} Discoverify\u00A0\u00A0|\u00A0\u00A0Created by `}
            <a href={'http://aaronmamparo.com'} target={'_blank'}>{'Aaron Mamparo'}</a>{'\u00A0\u00A0|\u00A0\u00A0'}
            <a href={'mailto:aaronmamparo@gmail.com?subject=Discoverify Feedback'} target={'_blank'}>{'Feedback?'}</a>
          </div>
        </div>
      </div>
      <Audio/>
    </>
  );
};

App.propTypes = {};


export default App;