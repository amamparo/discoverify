import get, {post} from './wrappedSpotifyApiCall';
import _ from 'lodash';

export default async (playlistName, playlistTracks) => {
  const userId = (await get('/v1/me')).id;
  const playlistId = (await post(`/v1/users/${userId}/playlists`, {
    name: playlistName,
    description: 'Exported from Discoverify',
    public: false
  })).id;
  let trackUriChunks = _.chunk(playlistTracks.map(({id}) => `spotify:track:${id}`), 100);
  for (let i = 0; i < trackUriChunks.length; i++) {
    await post(`/v1/playlists/${playlistId}/tracks`, {
      uris: trackUriChunks[i]
    });
  }
};