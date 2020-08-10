import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const AudioPlayer = ({nowPlaying}) => {
  return nowPlaying ? (
    <audio src={nowPlaying.preview_url} autoPlay/>
  ) : null;
};

AudioPlayer.propTypes = {
  nowPlaying: PropTypes.object
};

const mapStateToProps = ({nowPlaying}) => ({
  nowPlaying
});

export default connect(mapStateToProps)(AudioPlayer);