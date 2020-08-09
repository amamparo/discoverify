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
  const {token, featureFilters} = req.query;
  const tracks = (await getSpotifyData({
    endpoint: '/v1/recommendations',
    params: {
      limit: 100,
      market: 'US',
      seed_genres: genre,
      ...JSON.parse(featureFilters || {})
    },
    token
  })).tracks.filter(({preview_url}) => !_.isNil(preview_url));
  const audioFeatures = (await getSpotifyData({
    endpoint: '/v1/audio-features',
    params: {
      ids: tracks.map(({id}) => id).join(',')
    },
    token
  })).audio_features;
  return res.json(tracks.map(track => ({
    ...track,
    features: audioFeatures.find(x => x.id === track.id)
  })));
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