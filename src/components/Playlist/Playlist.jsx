import React from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/Card';
import {connect} from 'react-redux';
import './Playlist.scss';
import PlaylistTrack from './PlaylistTrack';

const Playlist = ({playlistTracks}) => {
  return (
    <Card title={'Playlist'} className={'playlist'}>
      <table className={'table table-hover'}>
        <thead>
        <tr>
          <th scope={'col'} className={'album-art'}/>
          <th scope={'col'} className={'title'}>{'Title'}</th>
          <th scope={'col'} className={'artist'}>{'Artist'}</th>
          <th scope={'col'} className={'album'}>{'Album'}</th>
          <th scope={'col'} className={'buttons'}/>
        </tr>
        </thead>
        <tbody>
        {playlistTracks.map(track => <PlaylistTrack key={track.id} track={track}/>)}
        </tbody>
      </table>
      {
        playlistTracks && playlistTracks.length === 0 ? (
          <div className={'p-4 text-center'}>
            {'Click on a song in Song Discovery to add it to the playlist'}
          </div>
        ) : null
      }
    </Card>
  );
};

Playlist.propTypes = {
  playlistTracks: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = ({playlistTracks}) => ({
  playlistTracks
});

export default connect(mapStateToProps)(Playlist);