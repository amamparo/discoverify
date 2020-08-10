import wrappedSpotifyApiCall from './wrappedSpotifyApiCall';

export default async (query) => {
  return (await wrappedSpotifyApiCall('/v1/search', {
    q: query,
    limit: 50,
    type: 'track',
    market: 'from_token'
  })).tracks.items;
};