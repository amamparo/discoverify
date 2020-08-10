import {
  RECEIVE_GENRES,
  RECEIVE_RECOMMENDATIONS,
  REQUEST_GENRES,
  REQUEST_RECOMMENDATIONS, RESET_FEATURE_FILTERS, SET_BENCHMARK_TRACK,
  SET_FEATURE_FILTER,
  SET_GENRE_FILTER, SET_IS_EDITING_BENCHMARK_TRACK, SET_NOW_PLAYING,
  SET_X_AXIS, SET_Y_AXIS,
} from './actions';

export const initialState = {
  genres: null,
  isFetchingGenres: null,
  recommendations: [],
  isFetchingRecommendations: null,
  genreFilter: null,
  featureFilters: {},
  xAxis: null,
  yAxis: null,
  nowPlaying: null,
  benchmarkTrack: null,
  isEditingBenchmarkTrack: false
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case REQUEST_RECOMMENDATIONS: {
      return {
        ...state,
        isFetchingRecommendations: true
      }
    }
    case RECEIVE_RECOMMENDATIONS: {
      return {
        ...state,
        recommendations: state.isFetchingRecommendations ? payload : state.recommendations,
        isFetchingRecommendations: false
      }
    }
    case SET_FEATURE_FILTER: {
      return {
        ...state,
        featureFilters: {
          ...state.featureFilters,
          ...payload,
        }
      }
    }
    case RESET_FEATURE_FILTERS: {
      return {
        ...state,
        featureFilters: {}
      }
    }
    case SET_X_AXIS: {
      return {
        ...state,
        xAxis: payload
      }
    }
    case SET_Y_AXIS: {
      return {
        ...state,
        yAxis: payload
      }
    }
    case SET_NOW_PLAYING: {
      return {
        ...state,
        nowPlaying: payload
      }
    }
    case SET_BENCHMARK_TRACK: {
      return {
        ...state,
        benchmarkTrack: payload
      }
    }
    case SET_IS_EDITING_BENCHMARK_TRACK: {
      return {
        ...state,
        isEditingBenchmarkTrack: payload
      }
    }
    default:
      return state;
  }
}