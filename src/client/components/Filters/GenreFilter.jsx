import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {getGenres} from '../../redux/actionCreators';
import {connect} from 'react-redux';
import {setGenreFilter} from '../../redux/actions';

const GenreFilter = ({genreFilter, genres, getGenres, setGenreFilter}) => {
  useEffect(() => {
    getGenres();
  }, [getGenres]);
  return (<div className={'form-group'}>
    <select className={'custom-select'} value={genreFilter || ''}
            onChange={({target: {value}}) => setGenreFilter(value)}>
      <option disabled value={''}>{'Choose a genre'}</option>
      {
        genres && genres.map(genre => <option key={genre} value={genre}>{genre}</option>)
      }
    </select>
  </div>);
};

GenreFilter.propTypes = {
  genreFilter: PropTypes.string,
  getGenres: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.string),
  setGenreFilter: PropTypes.func
};

const mapStateToProps = ({genres, genreFilter}) => ({
  genreFilter,
  genres
});

const mapDispatchToProps = dispatch => ({
  getGenres: () => getGenres(dispatch),
  setGenreFilter: genre => dispatch(setGenreFilter(genre)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GenreFilter);