import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getRecommendations, suggestAxes} from '../../../redux/actionCreators';

const SuggestAxesButton = ({recommendations, suggestAxes}) => {
  return (
    <button type='button' className={`btn btn-primary btn-block ${recommendations.length === 0 ? 'disabled' : ''}`}
            onClick={() => suggestAxes(recommendations)}>
      {'Suggest Axes'}
    </button>
  );
};

SuggestAxesButton.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object),
  suggestAxes: PropTypes.func
};

const mapStateToProps = ({recommendations = []}) => ({
  recommendations
});

const mapDispatchToProps = dispatch => ({
  suggestAxes: (recommendations) => suggestAxes(recommendations)(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAxesButton);