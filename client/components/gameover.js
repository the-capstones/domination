import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_gameover.scss';

const GameOver = (props) => {
  const { lost } = props;
  const message = lost ? 'lost' : 'won';

  return (
    <div className="gameover-wrapper">
      <h1>You {message}!</h1>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(GameOver);

/**
 * PROP TYPES
 */
GameOver.propTypes = {

}
