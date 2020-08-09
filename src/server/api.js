import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import getSpotifyData, {SpotifyUnauthorizedError} from './getSpotifyData';
import _ from 'lodash';

const app = express();

app.use(cors());

app.get('/genres', async (req, res) => {
  const {token} = req.query;
  return res.json((await getSpotifyData({
    endpoint: '/v1/recommendations/available-genre-seeds',
    token
  })).genres);
});

app.get('/recommendations/:genre', async (req, res) => {
  const {genre} = req.params;
  const {featureFilters, token} = req.query;
  const tracksFromRecommendations = (await getSpotifyData({
    endpoint: '/v1/recommendations',
    params: {
      limit: 100,
      market: 'from_token',
      seed_genres: genre,
      ...JSON.parse(featureFilters || {})
    },
    token
  })).tracks;
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
      ...(await getSpotifyData({
        endpoint: '/v1/tracks',
        params: {
          ids: marketIdChunks[0].join(','),
          market: 'from_token'
        },
        token
      })).tracks
    ]
  }
  const audioFeatures = (await getSpotifyData({
    endpoint: '/v1/audio-features',
    params: {
      ids: Object.keys(recommendationTrackIdToMarketTrackId).join(',')
    },
    token
  })).audio_features;
  return res.json(marketTracks.map(track => ({
    ...track,
    features: audioFeatures.find(x => [recommendationTrackIdToMarketTrackId[x.id], x.id].includes(track.id))
  })).filter(({features}) => !_.isNil(features)));
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.constructor === SpotifyUnauthorizedError) {
      return res.status(401).send('Unauthorized');
    }
    return res.status(500).send(err.stack);
  }
  next();
});

const port = process.env.PORT;


app.listen(port, () => console.log(`API listening at http://localhost:${port}`));