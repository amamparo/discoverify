export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS';
export const requestRecommendations = () => ({type: REQUEST_RECOMMENDATIONS});

export const RECEIVE_RECOMMENDATIONS = 'RECEIVE_RECOMMENDATIONS';
export const receiveRecommendations = recommendations => ({type: RECEIVE_RECOMMENDATIONS, payload: recommendations});

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

export const SET_BENCHMARK_TRACK = 'SET_BENCHMARK_TRACK';
export const setBenchmarkTrack = track => ({type: SET_BENCHMARK_TRACK, payload: track});

export const SET_IS_EDITING_BENCHMARK_TRACK = 'SET_IS_EDITING_BENCHMARK_TRACK';
export const setIsEditingBenchmarkTrack = isEditingBenchmarkTrack => ({
  type: SET_IS_EDITING_BENCHMARK_TRACK,
  payload: isEditingBenchmarkTrack
});

export const ADD_TRACK_TO_PLAYLIST = 'ADD_TRACK_TO_PLAYLIST';
export const addTrackToPlaylist = track => ({type: ADD_TRACK_TO_PLAYLIST, payload: track});

export const REMOVE_TRACK_FROM_PLAYLIST = 'REMOVE_TRACK_FROM_PLAYLIST';
export const removeTrackFromPlaylist = trackId => ({type: REMOVE_TRACK_FROM_PLAYLIST, payload: trackId});