import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './PlaylistTrack.scss';
import _ from 'lodash';
import {faPlay, faStop, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {removeTrackFromPlaylist, setNowPlaying} from '../../redux/actions';
import classnames from 'classnames';

const Playlist = ({track, removeTrack, nowPlaying, setNowPlaying}) => {
  const {album: {images}} = track;
  const isNowPlaying = nowPlaying && nowPlaying.id === track.id;
  return (
    <tr key={track.id} className={'track'}>
      <td className={'album-art'}>
        <img src={images.length ? _.orderBy(images, ['height'])[0].url : ''}/>
        <div className={classnames('play-stop-button', {'is-playing': isNowPlaying})}
             onClick={() => setNowPlaying(isNowPlaying ? null : track)}>
          <FontAwesomeIcon icon={isNowPlaying ? faStop : faPlay} size={'lg'}/>
        </div>
      </td>
      <td className={'title'}>{track.name}</td>
      <td className={'artist'}>{track.artists.map(({name}) => name).join(', ')}</td>
      <td className={'album'}>{track.album.name}</td>
      <td className={'buttons'}>
        <div className={'delete-track'} title={'Remove from playlist'} onClick={() => removeTrack(track.id)}>
          <FontAwesomeIcon icon={faTimes}/>
        </div>
      </td>
    </tr>
  );
};

Playlist.propTypes = {
  track: PropTypes.object,
  removeTrack: PropTypes.func,
  nowPlaying: PropTypes.object,
  setNowPlaying: PropTypes.func
};

const mapStateToProps = ({nowPlaying}) => ({
  nowPlaying
});

const mapDispatchToProps = dispatch => ({
  removeTrack: trackId => dispatch(removeTrackFromPlaylist(trackId)),
  setNowPlaying: track => dispatch(setNowPlaying(track))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);