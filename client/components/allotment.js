import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase'
import { changePhaseFunction, highlightNeighbors } from '../functions';

import '../css/_allotment-gui.scss';

const AllotmentGUI = (props) => {
  const {
    user,
    allotmentLeft,
    hexId,
    addUnit,
    hexagons,
    currentPhase,
    currentPlayer,
    playerOrder,
    allotmentPointsPerTurn,
    selectedHex
  } = props;

  return (
    <div className="allotment-gui-wrapper">

      <div className="allotment">
        <button onClick={() => addUnit(user, hexId, hexagons, allotmentLeft, currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, selectedHex)}>
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
        <span className="muted">{allotmentLeft}</span>
        <span> {allotmentLeft > 1 || allotmentLeft === 0 ? 'units left' : 'unit left'}</span>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const isBoardLoaded = Object.keys(state.board).length > 0;
  return {
    allotmentLeft: state.board.state.allotmentLeft,
    hexagons: state.board.hexes,
    user: state.user.username,
    isLoggedIn: !!state.user.id,
    inGame: state.inGame,
    status: isBoardLoaded && state.board.state.status,
    currentPlayer: isBoardLoaded && state.board.state.currentPlayer || '',
    currentPhase: isBoardLoaded && state.board.state.currentPhase || '',
    playerOrder: isBoardLoaded && state.board.state.playerOrder || [],
    allotmentPointsPerTurn: isBoardLoaded && state.board.state.allotmentPointsPerTurn,
    selectedHex: isBoardLoaded && state.board.state.selectedHex,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;
  return {
    addUnit(user, id, hexagons, inputAllotmentLeft, currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, selectedHex) {
      if (user !== currentPlayer) return;
      if (inputAllotmentLeft > 0) {
        inputAllotmentLeft -= 1;
        const updatedHexArr = Object.entries(hexagons).filter(hex => hex[0] === id );
        const hexId = updatedHexArr[0][0];
        const hexStats = updatedHexArr[0][1];
        const updatedHexObj = {
          [hexId]: Object.assign({}, hexStats),
        };
        updatedHexObj[hexId].unit1 += 1;
        firebase.ref(`/boards/${boardId}/hexes`).update(updatedHexObj);
        firebase.ref(`/boards/${boardId}/state`).update({ allotmentLeft: inputAllotmentLeft });
        if (inputAllotmentLeft === 0) {
          changePhaseFunction(currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, hexagons, boardId);
          // highlightNeighbors(selectedHex, currentPlayer, hexagons);
        }
      }
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllotmentGUI));

/**
 * PROP TYPES
 */
AllotmentGUI.propTypes = {

}
