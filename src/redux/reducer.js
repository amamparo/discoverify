import {
  ADD_TRACK_TO_PLAYLIST, END_SAVING_PLAYLIST,
  RECEIVE_GENRES,
  RECEIVE_RECOMMENDATIONS, REMOVE_TRACK_FROM_PLAYLIST,
  REQUEST_GENRES,
  REQUEST_RECOMMENDATIONS, RESET_FEATURE_FILTERS, SET_BENCHMARK_TRACK,
  SET_FEATURE_FILTER,
  SET_GENRE_FILTER, SET_IS_EDITING_BENCHMARK_TRACK, SET_IS_EXPORTING_PLAYLIST, SET_NOW_PLAYING,
  SET_X_AXIS, SET_Y_AXIS, START_SAVING_PLAYLIST,
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
  isEditingBenchmarkTrack: false,
  playlistTracks: [],
  isExportingPlaylist: false,
  isSavingPlaylist: false
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
    case ADD_TRACK_TO_PLAYLIST: {
      return {
        ...state,
        playlistTracks: _.uniqBy([
          ...(state.playlistTracks || []),
          payload
        ], x => x.id)
      }
    }
    case REMOVE_TRACK_FROM_PLAYLIST: {
      return {
        ...state,
        playlistTracks: (state.playlistTracks || []).filter(x => x.id !== payload)
      }
    }
    case SET_IS_EXPORTING_PLAYLIST: {
      return {
        ...state,
        isExportingPlaylist: payload
      }
    }
    case START_SAVING_PLAYLIST: {
      return {
        ...state,
        isSavingPlaylist: true
      }
    }
    case END_SAVING_PLAYLIST: {
      return {
        ...state,
        isSavingPlaylist: false
      }
    }
    default:
      return state;
  }
}