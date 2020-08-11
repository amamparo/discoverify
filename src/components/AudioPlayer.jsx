import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setNowPlaying} from '../redux/actions';

const AudioPlayer = ({nowPlaying, unsetNowPlaying}) => {
  return nowPlaying ? (
    <audio src={nowPlaying.preview_url} autoPlay onEnded={unsetNowPlaying}/>
  ) : null;
};

AudioPlayer.propTypes = {
  nowPlaying: PropTypes.object,
  unsetNowPlaying: PropTypes.func
};

const mapStateToProps = ({nowPlaying}) => ({
  nowPlaying
});

const mapDispatchToProps = dispatch => ({
  unsetNowPlaying: () => dispatch(setNowPlaying(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);