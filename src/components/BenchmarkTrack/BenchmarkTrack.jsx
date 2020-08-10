import React, {useEffect} from 'react';
import BenchmarkTrackSearch from './BenchmarkTrackSearch/BenchmarkTrackSearch';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import BenchmarkTrackDetails from './BenchmarkTrackDetails';
import './BenchmarkTrack.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-regular-svg-icons';
import {setIsEditingBenchmarkTrack} from '../../redux/actions';
import Card from '../shared/Card';


const BenchmarkTrack = ({benchmarkTrack, setIsEditingBenchmarkTrack, isEditingBenchmarkTrack}) => {
  useEffect(() => {
    if (_.isNil(benchmarkTrack) && !isEditingBenchmarkTrack) {
      setIsEditingBenchmarkTrack(true)
    }
  }, [benchmarkTrack, isEditingBenchmarkTrack])
  return (<>
    <Card title={'Reference Track'} buttonContent={<FontAwesomeIcon icon={faEdit}/>}
          buttonAction={() => setIsEditingBenchmarkTrack(true)}>
      <div className={'row benchmark-track'}>
        <BenchmarkTrackDetails/>
      </div>
    </Card>
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