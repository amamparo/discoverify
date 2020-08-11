import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import './PlaylistTrack.scss';
import _ from 'lodash';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {removeTrackFromPlaylist} from '../../redux/actions';

const Playlist = ({track, removeTrack}) => {
  const {album: {images}} = track;
  return (
    <tr key={track.id} className={'track'}>
      <td className={'album-art'}>
        <img src={images.length ? _.orderBy(images, ['height'])[0].url : ''}/>
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
  removeTrack: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  removeTrack: trackId => dispatch(removeTrackFromPlaylist(trackId))
})

export default connect(null, mapDispatchToProps)(Playlist);