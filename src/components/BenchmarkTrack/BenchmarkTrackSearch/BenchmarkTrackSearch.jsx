import React, {useCallback, useEffect, useState} from 'react';
import Modal from 'react-modal';
import './BenchmarkTrackSearch.scss';
import getTrackSearchResults from '../../../api/getTrackSearchResults';
import _ from 'lodash';
import BenchmarkTrackSearchResult from './BenchmarkTrackSearchResult';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setIsEditingBenchmarkTrack} from '../../../redux/actions';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Card from '../../shared/Card';

const modalStyle = {
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: 0,
  width: 400,
  height: 'auto',
  bottom: 'auto',
  overflow: 'visible'
};

const modalOverlayStyle = {
  backgroundColor: 'rgba(64, 64, 64, 0.25)'
}

const BenchmarkTrackSearch = ({benchmarkTrack, close}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const debouncedSetSearchResults = useCallback(
    _.debounce(
      async query => setSearchResults(await getTrackSearchResults(query)),
      250
    ),
    []
  );
  
  useEffect(() => {
    query === '' ? setSearchResults([]) : debouncedSetSearchResults(query)
  }, [query]);
  
  const thereIsAnExistingBenchmarkTrack = !_.isNil(benchmarkTrack);
  
  const onRequestClose = () => {
    if (!thereIsAnExistingBenchmarkTrack) {
      return;
    }
    close();
  }
  
  return (
    <Modal isOpen style={{content: modalStyle, overlay: modalOverlayStyle}}
           shouldCloseOnOverlayClick shouldCloseOnEsc
           onRequestClose={onRequestClose}>
      <Card title={'Choose a Reference Track'}
            buttonContent={thereIsAnExistingBenchmarkTrack ? <FontAwesomeIcon icon={faTimes}/> : null}
            buttonAction={close}>
        <div className={'search'}>
          <div className={'search-input'}>
            <input className={'form-control form-control-lg'} type={'text'}
                   placeholder={'Search by title, artist, or album'}
                   onChange={e => setQuery(e.target.value)} value={query}
                   autoFocus={true}/>
          </div>
          {searchResults.length > 0 && query !== '' ? (
            <div className={'search-results'}>
              {
                searchResults
                  .filter(({id}) => id !== (benchmarkTrack || {}).id)
                  .map(track => <BenchmarkTrackSearchResult key={track.id} track={track}/>)
              }
            </div>
          ) : null}
        </div>
      </Card>
    </Modal>
  );
};

BenchmarkTrackSearch.propTypes = {
  benchmarkTrack: PropTypes.object,
  close: PropTypes.func
};

const mapStateToProps = ({benchmarkTrack}) => ({
  benchmarkTrack
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(setIsEditingBenchmarkTrack(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkTrackSearch);