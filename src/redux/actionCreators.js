import {
  endSavingPlaylist,
  receiveRecommendations,
  requestRecommendations, setIsExportingPlaylist,
  setXYAxis,
  startSavingPlaylist
} from './actions';
import {getOptimalCategories} from '../components/Graph/AxisSelects/axisCategories';
import apiGetRecommendations from '../api/getRecommendations';
import savePlaylist from '../api/savePlaylist';

export const getRecommendations = (benchmarkTrack, featureFilters) => async dispatch => {
  dispatch(requestRecommendations());
  dispatch(receiveRecommendations(await apiGetRecommendations(benchmarkTrack, featureFilters)));
}

export const saveToPlaylist = (playlistName, playlistTracks) => async dispatch => {
  dispatch(startSavingPlaylist());
  await savePlaylist(playlistName, playlistTracks)
  dispatch(endSavingPlaylist());
  dispatch(setIsExportingPlaylist(false));
}

export const suggestAxes = (recommendations) => dispatch => {
  const optimalCategories = getOptimalCategories(recommendations);
  if (optimalCategories.length < 2) {
    return;
  }
  dispatch(setXYAxis(optimalCategories[0], optimalCategories[1]));
};