import {RECEIVE_RECOMMENDATIONS, RECEIVE_TOP_ARTISTS, REQUEST_RECOMMENDATIONS, REQUEST_TOP_ARTISTS} from './actions';

export const initialState = {
  topArtists: null,
  recommendations: null
};

export default function (state = initialState, {type, payload}) {
  switch (type) {
    case REQUEST_TOP_ARTISTS: {
      return {
        ...state,
        isFetchingTopArtists: true
      }
    }
    case RECEIVE_TOP_ARTISTS: {
      return {
        ...state,
        topArtists: state.isFetchingTopArtists ? payload : state.topArtists,
        isFetchingTopArtists: false
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
    default:
      return state;
  }
}