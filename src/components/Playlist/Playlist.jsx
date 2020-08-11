import React from 'react';
import PropTypes from 'prop-types';
import Card from '../shared/Card';
import {connect} from 'react-redux';
import './Playlist.scss';
import PlaylistTrack from './PlaylistTrack';
import {setIsExportingPlaylist} from '../../redux/actions';
import ExportPlaylist from './ExportPlaylist';

const Playlist = ({playlistTracks, setIsExportingPlaylist, isExportingPlaylist}) => {
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
      {
        playlistTracks && playlistTracks.length > 0 ? (
          <div className={'export col-sm-12 p-3 text-center'}>
            <button type='button' className={`btn btn-primary btn-block`} onClick={() => setIsExportingPlaylist(true)}>
              {'Export to Spotify'}
            </button>
          </div>
        ) : null
      }
      {
        isExportingPlaylist ? <ExportPlaylist/> : null
      }
    </Card>
  );
};

Playlist.propTypes = {
  playlistTracks: PropTypes.arrayOf(PropTypes.object),
  setIsExportingPlaylist: PropTypes.func,
  isExportingPlaylist: PropTypes.bool
};

const mapStateToProps = ({playlistTracks, isExportingPlaylist}) => ({
  playlistTracks,
  isExportingPlaylist
});

const mapDispatchToProps = dispatch => ({
  setIsExportingPlaylist: isExportingPlaylist => dispatch(setIsExportingPlaylist(isExportingPlaylist))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlist);