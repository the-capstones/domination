import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_gameover.scss';

const GameOver = (props) => {
  const { lost, hideGameOver } = props;
  const message = lost ? 'lost' : 'won';

  return (
    <div className="gameover-wrapper">
      <h1>You {message}!</h1>
      <button onClick={hideGameOver}><i className="fa fa-times" /></button>
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
    hideGameOver() {
      const screen = document.getElementsByClassName('gameover-wrapper')[0];
      screen.classList.add('hide');
    }
  }
}

export default connect(mapState, mapDispatch)(GameOver);

/**
 * PROP TYPES
 */
GameOver.propTypes = {

}
