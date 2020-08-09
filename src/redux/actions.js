export const REQUEST_GENRES = 'REQUEST_GENRES';
export const requestGenres = () => ({type: REQUEST_GENRES});

export const RECEIVE_GENRES = 'RECEIVE_GENRES';
export const receiveGenres = topArtists => ({type: RECEIVE_GENRES, payload: topArtists});

export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS';
export const requestRecommendations = () => ({type: REQUEST_RECOMMENDATIONS});

export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS';
export const receiveRecommendations = recommendations => ({type: RECEIVE_RECOMMENDATIONS, payload: recommendations});

export const SET_GENRE_FILTER = 'SET_GENRE_FILTER';
export const setGenreFilter = genre => ({type: SET_GENRE_FILTER, payload: genre});

export const SET_FEATURE_FILTER = 'SET_FEATURE_FILTER';
export const setFeatureFilter = (key, min, max) => ({
  type: SET_FEATURE_FILTER,
  payload: {
    [`min_${key}`]: min,
    [`max_${key}`]: max
  }
});

export const RESET_FEATURE_FILTERS = 'RESET_FEATURE_FILTERS';
export const resetFeatureFilters = () => ({type: RESET_FEATURE_FILTERS});

export const SET_X_AXIS = 'SET_X_AXIS';
export const setXAxis = xAxis => ({type: SET_X_AXIS, payload: xAxis});

export const SET_Y_AXIS = 'SET_Y_AXIS';
export const setYAxis = yAxis => ({type: SET_Y_AXIS, payload: yAxis});

export const SET_NOW_PLAYING = 'SET_NOW_PLAYING';
export const setNowPlaying = track => ({type: SET_NOW_PLAYING, payload: track});