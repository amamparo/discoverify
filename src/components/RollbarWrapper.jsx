import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Rollbar from 'rollbar';

export default class RollbarWrapper extends Component {
  static propTypes = {
    children: PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.state = {
      rollbar: new Rollbar({
        accessToken: process.env.ROLLBAR_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
        payload: {
          environment: process.env.ROLLBAR_ENVIRONMENT
        }
      })
    };
  }
  
  render() {
    return this.props.children;
  }
}