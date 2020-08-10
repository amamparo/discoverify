import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import {setBenchmarkTrack, setIsEditingBenchmarkTrack} from '../../../redux/actions';

const BenchmarkTrackSearchResult = ({track, setBenchmarkTrack, closeSearch}) => {
  const {album: {images}} = track;
  const onClick = () => {
    setBenchmarkTrack(track);
    closeSearch();
  };
  return (
    <div className='search-result' onClick={onClick}>
      <div className='album-art'>
        <img src={images.length ? _.orderBy(images, ['height'])[0].url : ''}/>
      </div>
      <div className='details'>
        <div><strong>{track.name}</strong></div>
        <div>{track.artists.map(a => a.name).join(', ')}</div>
      </div>
    </div>
  );
};

BenchmarkTrackSearchResult.propTypes = {
  track: PropTypes.object,
  setBenchmarkTrack: PropTypes.func,
  closeSearch: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setBenchmarkTrack: track => dispatch(setBenchmarkTrack(track)),
  closeSearch: () => dispatch(setIsEditingBenchmarkTrack(false))
});

export default connect(null, mapDispatchToProps)(BenchmarkTrackSearchResult);