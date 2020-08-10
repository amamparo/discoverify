import wrappedSpotifyApiCall from './wrappedSpotifyApiCall';
import _ from 'lodash';

export default async (benchmarkTrack, featureFilters) => {
  const tracks = (await wrappedSpotifyApiCall(
    '/v1/recommendations',
    {
      limit: 100,
      market: 'from_token',
      seed_tracks: benchmarkTrack.id,
      ...featureFilters
    }
  )).tracks;
  tracks.push(benchmarkTrack);
  
  const recommendationTrackIdToMarketTrackId = tracks.reduce((accum, marketTrack) => {
    return {
      ...accum,
      [marketTrack.id]: 'linked_from' in marketTrack ?
        marketTrack.linked_from.id :
        marketTrack.id
    }
  }, {});
  let marketIdChunks = _.chunk(Object.values(recommendationTrackIdToMarketTrackId), 50);
  let marketTracks = [];
  for (let i = 0; i < marketIdChunks.length; i++) {
    marketTracks = [
      ...marketTracks,
      ...(await wrappedSpotifyApiCall('/v1/tracks', {ids: marketIdChunks[i].join(','), market: 'from_token'})).tracks
    ];
  }
  marketIdChunks = _.chunk(Object.values(recommendationTrackIdToMarketTrackId), 100);
  let audioFeatures = [];
  for (let i = 0; i < marketIdChunks.length; i++) {
    audioFeatures = [
      ...audioFeatures,
      ...(await wrappedSpotifyApiCall(
        '/v1/audio-features',
        {
          ids: marketIdChunks[i].join(',')
        })).audio_features
    ]
  }
  return marketTracks.map(track => ({
    ...track,
    isBenchmarkTrack: track.id === benchmarkTrack.id,
    features: audioFeatures.find(x => [recommendationTrackIdToMarketTrackId[x.id], x.id].includes(track.id))
  })).filter(({features}) => !_.isNil(features));
};