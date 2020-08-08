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