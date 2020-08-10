import {CALLBACK_PATH, SPOTIFY_CLIENT_ID} from './constants';

export default () => {
  window.location.href = [
    'https://accounts.spotify.com/authorize?response_type=token',
    `&client_id=${SPOTIFY_CLIENT_ID}`,
    `&scope=${encodeURIComponent('user-read-private')}`,
    `&redirect_uri=${encodeURIComponent(`${window.location.origin}${CALLBACK_PATH}`)}`,
    `&show_dialog=true`
  ].join('');
}