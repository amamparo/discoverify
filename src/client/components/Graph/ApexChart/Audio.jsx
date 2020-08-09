import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';
import {setNowPlaying} from '../../../redux/actions';
import {connect} from 'react-redux';

const Audio = ({nowPlaying, setNowPlaying}) => {
  console.error('=============> nowPlaying: ', nowPlaying);
  return nowPlaying ? (
    <Sound url={nowPlaying.preview_url} playStatus={Sound.status.PLAYING}
           onFinishedPlaying={() => setNowPlaying(null)}/>
  ) : null;
};

Audio.propTypes = {
  nowPlaying: PropTypes.object,
  setNowPlaying: PropTypes.func
};

const mapStateToProps = ({nowPlaying}) => ({
  nowPlaying
});

const mapDispatchToProps = dispatch => ({
  setNowPlaying: track => dispatch(setNowPlaying(track))
});

export default connect(mapStateToProps, mapDispatchToProps)(Audio);