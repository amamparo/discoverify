import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import NoBenchmarkTrackDetails from './NoBenchmarkTrackDetails';

const BenchmarkTrackDetails = ({benchmarkTrack}) => {
  if (_.isNil(benchmarkTrack)) {
    return <NoBenchmarkTrackDetails/>;
  }
  const {album: {images}} = benchmarkTrack;
  return (
    <div className='benchmark-track-details'>
      <div className='album-art'>
        <img src={images.length ? _.orderBy(images, ['height'])[0].url : ''}/>
      </div>
      <div className='details pr-0'>
        <div><strong>{benchmarkTrack.name}</strong></div>
        <div>{benchmarkTrack.artists.map(a => a.name).join(', ')}</div>
      </div>
    </div>
  );
};

BenchmarkTrackDetails.propTypes = {
  benchmarkTrack: PropTypes.object
};

const mapStateToProps = ({benchmarkTrack}) => ({
  benchmarkTrack
});

export default connect(mapStateToProps)(BenchmarkTrackDetails);