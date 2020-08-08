import {
  RECEIVE_GENRES,
  REQUEST_GENRES,
  SET_GENRE_FILTER, SET_FEATURE_FILTER, REQUEST_RECOMMENDATIONS, RECEIVE_RECOMMENDATIONS,
} from './actions';

export const initialState = {
  genres: null,
  isFetchingGenres: null,
  recommendations: null,
  isFetchingRecommendations: null,
  genreFilter: null,
  featureFilters: {}
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
    default:
      return state;
  }
}