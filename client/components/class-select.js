import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

import '../css/_class-select.scss';

const ClassSelect = (props) => {
  const classOptions = ['king', 'soldier', 'champion', 'commander', 'viking', 'wizard'];
  const { selectClass, user, playerClasses } = props;

  return (
    <div className="class-select-wrapper">
      <div className="title">
        <h1>Select A Class</h1>
      </div>
      <form onSubmit={e => selectClass(e, user, playerClasses)}>
        {
          classOptions.map((playerClass, i) => (
            <label key={i} className="class-container">
            <input
              id={playerClass + '-radio-btn'}
              type="radio"
              name="classSelect"
              value={playerClass}
            />
            <img src={`../../assets/avatar/${playerClass}.png`} />
            <h3>{playerClass.charAt(0).toUpperCase() + playerClass.slice(1)}</h3>
            </label>
          ))
        }
        <input type="submit" value="Let's Rumble!" />
      </form>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {

  return {
    user: state.user.username,
    playerOrder: state.board.state.playerOrder,
    playerClasses: state.board.state.playerClasses,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    selectClass(e, user, playerClasses) {
      e.preventDefault();
      const selectedClass = e.target.classSelect.value;
      if (!selectedClass) return;
      const newPlayerClasses = Object.assign({}, playerClasses, { [user]: selectedClass });
      firebase.ref(`/boards/${boardId}/state`).update({ playerClasses: newPlayerClasses });
      ownProps.history.push(`/boards/${boardId}`);
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ClassSelect));

/**
 * PROP TYPES
 */
ClassSelect.propTypes = {

}
