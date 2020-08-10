import wrappedSpotifyApiCall from './wrappedSpotifyApiCall';
import _ from 'lodash';

export default async (benchmarkTrackId, featureFilters) => {
  const tracksFromRecommendations = (await wrappedSpotifyApiCall(
    '/v1/recommendations',
    {
      limit: 100,
      market: 'from_token',
      seed_tracks: benchmarkTrackId,
      ...featureFilters
    }
  )).tracks;
  const recommendationTrackIdToMarketTrackId = tracksFromRecommendations.reduce((accum, recommendationTrack) => {
    return {
      ...accum,
      [recommendationTrack.id]: 'linked_from' in recommendationTrack ?
        recommendationTrack.linked_from.id :
        recommendationTrack.id
    }
  }, {});
  const marketIdChunks = _.chunk(Object.values(recommendationTrackIdToMarketTrackId), 50);
  let marketTracks = [];
  for (let i = 0; i < marketIdChunks.length; i++) {
    marketTracks = [
      ...marketTracks,
      ...(await wrappedSpotifyApiCall('/v1/tracks', {ids: marketIdChunks[0].join(','), market: 'from_token'})).tracks
    ];
  }
  const audioFeatures = (await wrappedSpotifyApiCall(
    '/v1/audio-features',
    {
      ids: Object.keys(recommendationTrackIdToMarketTrackId).join(',')
    })).audio_features;
  return marketTracks.map(track => ({
    ...track,
    features: audioFeatures.find(x => [recommendationTrackIdToMarketTrackId[x.id], x.id].includes(track.id))
  })).filter(({features}) => !_.isNil(features));
};