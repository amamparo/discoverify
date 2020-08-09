import wrappedSpotifyApiCall from './wrappedSpotifyApiCall';

export default async () => {
  return (await wrappedSpotifyApiCall('/v1/recommendations/available-genre-seeds')).genres;
};