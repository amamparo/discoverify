import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer, {initialState} from './reducer';
import _ from 'lodash';

const releaseNumber = process.env.RELEASE_NUMBER;

const storeFieldsToResetToDefaultValueOnPageLoad = ['featureFilters', 'recommendations', 'nowPlaying', 'isEditingBenchmarkTrack', 'xAxis', 'yAxis', 'isExportingPlaylist', 'isSavingPlaylist'];

const storeFieldsToPersistAcrossReleases = ['playlistTracks', 'benchmarkTrack'];

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    const deserializedState = serializedState ? JSON.parse(serializedState) : undefined;
    if (!deserializedState) {
      return;
    }
    const releaseNumberHasChanged = deserializedState.releaseNumber !== releaseNumber;
    return {
      ...(releaseNumberHasChanged ? {} : deserializedState),
      ...storeFieldsToPersistAcrossReleases.reduce((persistedState, fieldKey) => ({
        ...persistedState,
        [fieldKey]: deserializedState[fieldKey]
      }), {}),
      ...storeFieldsToResetToDefaultValueOnPageLoad.reduce((defaultedState, fieldKey) => ({
        ...defaultedState,
        [fieldKey]: initialState[fieldKey]
      }), {})
    };
  } catch {
    console.info('Couldn\'t read pre-loaded state from local storage');
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      ...state,
      releaseNumber
    });
    localStorage.setItem('state', serializedState);
  } catch {
    console.info('Couldn\'t save state to local storage');
  }
};

export default () => {
  const store = createStore(reducer, loadState(), composeWithDevTools(applyMiddleware(thunk)));
  store.subscribe(_.throttle(() => {
    saveState(store.getState());
  }, 1000));
  return store;
};