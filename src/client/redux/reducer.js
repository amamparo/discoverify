import {
  RECEIVE_GENRES,
  RECEIVE_RECOMMENDATIONS,
  REQUEST_GENRES,
  REQUEST_RECOMMENDATIONS,
  SET_FEATURE_FILTER,
  SET_GENRE_FILTER,
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
  yAxis: null
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case REQUEST_GENRES: {
      return {
        ...state,
        isFetchingGenres: true
      }
    }
    case RECEIVE_GENRES: {
      return {
        ...state,
        genres: state.isFetchingGenres ? payload : state.genres,
        isFetchingGenres: false
      }
    }
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
    case SET_GENRE_FILTER: {
      return {
        ...state,
        genreFilter: payload
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
    default:
      return state;
  }
}