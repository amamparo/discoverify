import React, {useEffect} from 'react';
import requireAuthorization from './Authorize/requireAuthorization';
import './App.scss';
import {connect} from 'react-redux';
import {getTopArtists} from '../redux/actionCreators';
import PropTypes from 'prop-types';

const App = ({getTopArtists, topArtists}) => {
  useEffect(() => {
    if (!topArtists) {
      getTopArtists();
    } else {
    
    }
  }, [getTopArtists, topArtists]);
  return (
    <div className={'container'}>
      {'Hello World'}
    </div>
  );
};

App.propTypes = {
  getTopArtists: PropTypes.func,
  topArtists: PropTypes.arrayOf(PropTypes.object),
};


const mapStateToProps = ({topArtists}) => ({
  topArtists
});

const mapDispatchToProps = dispatch => ({
  getTopArtists: () => getTopArtists(dispatch),
});

export default requireAuthorization(connect(mapStateToProps, mapDispatchToProps)(App));