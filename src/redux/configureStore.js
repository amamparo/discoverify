import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer';
import _ from 'lodash';

const releaseNumber = process.env.RELEASE_NUMBER;

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    const deserializedState = serializedState ? JSON.parse(serializedState) : undefined;
    if (deserializedState && deserializedState.releaseNumber === releaseNumber) {
      return {
        ...deserializedState,
        recommendations: [],
        nowPlaying: null,
        isEditingBenchmarkTrack: false,
        xAxis: null,
        yAxis: null,
        isExportingPlaylist: false,
        isSavingPlaylist: false
      }
    }
    return deserializedState && deserializedState.releaseNumber === releaseNumber ? deserializedState : undefined;
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