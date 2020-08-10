import React, {useEffect, useState} from 'react';
import BenchmarkTrackSearch from './BenchmarkTrackSearch/BenchmarkTrackSearch';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import BenchmarkTrackDetails from './BenchmarkTrackDetails';
import './BenchmarkTrack.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {setIsEditingBenchmarkTrack} from '../../redux/actions';


const BenchmarkTrack = ({benchmarkTrack, setIsEditingBenchmarkTrack, isEditingBenchmarkTrack}) => {
  useEffect(() => {
    if (_.isNil(benchmarkTrack) && !isEditingBenchmarkTrack) {
      setIsEditingBenchmarkTrack(true)
    }
  }, [benchmarkTrack, isEditingBenchmarkTrack])
  return (<>
    <div className={'card'}>
      <div className={'card-header'}>{'Reference Track'}</div>
      <div className={'card-body'}>
        <div className={'row benchmark-track'}>
          <div className={'col-sm-10'}>
            <BenchmarkTrackDetails/>
          </div>
          <div className={'col-sm-2 edit-button'} onClick={() => setIsEditingBenchmarkTrack(true)}>
            <div className={'inner-container'}>
              <FontAwesomeIcon icon={faEdit}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    {isEditingBenchmarkTrack ? <BenchmarkTrackSearch/> : null}
  </>);
};

BenchmarkTrack.propTypes = {
  benchmarkTrack: PropTypes.object,
  isEditingBenchmarkTrack: PropTypes.bool,
  setIsEditingBenchmarkTrack: PropTypes.func
};

const mapStateToProps = ({benchmarkTrack, isEditingBenchmarkTrack}) => ({
  benchmarkTrack,
  isEditingBenchmarkTrack
});

const mapDispatchToProps = dispatch => ({
  setIsEditingBenchmarkTrack: isEditingBenchmarkTrack => dispatch(setIsEditingBenchmarkTrack(isEditingBenchmarkTrack))
});
export default connect(mapStateToProps, mapDispatchToProps)(BenchmarkTrack);