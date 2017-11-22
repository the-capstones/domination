import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleRoll } from '../functions';
import firebase from '../firebase';
import '../css/_combat-risk.scss';

const CombatRisk = props => {
  const { endCombat, defendingUnits, attackingUnits } = props;

  return (
    <div id="combat-wrapper">
      <div className="combat">
        <div className="player-container">

          <div className="option-container">
            <label>PLAYER</label>
            <button onClick={() => handleRoll(props)}>ROLL</button>
            <button onClick={endCombat}>END COMBAT</button>
          </div>

          <div className="unit-container">
            <h2>
              {attackingUnits}
            </h2>
            <label>UNITS</label>
            <label>REMAINING</label>
          </div>

          <div className="roll-container">
            <div className="die-container">
              <img src="assets/wizard-avatar.jpg" />
              <label>-</label>
            </div>

            <div className="die-container">
              <img src="assets/wizard-avatar.jpg" />
              <label>-</label>
            </div>

            <div className="die-container">
              <img src="assets/wizard-avatar.jpg" />
              <label>-</label>
            </div>
          </div>

        </div>

        <div className="result">
          <h3>RESULT</h3>
        </div>

        <div className="enemy-container">

          <div className="option-container">
            <label>ENEMY</label>
          </div>

          <div className="enemy-unit-container">
            <h2>
              {defendingUnits}
            </h2>
            <label>UNITS</label>
            <label>REMAINING</label>
          </div>


          <div className="roll-container">
            <div className="enemy-die-container">
              <img src="assets/wizard-avatar.jpg" />
              <label>-</label>
            </div>

            <div className="enemy-die-container">
              <img src="assets/wizard-avatar.jpg" />
              <label>-</label>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

const mapState = (state) => {
  const hexes = state.board.hexes;
  const attackingHexId = state.board.state.prevSelectedHex;
  const defendingHexId = state.board.state.selectedHex;

  return {
    hexes,
    defendingHexId,
    attackingHexId,
    attackingUnits: hexes[attackingHexId].unit1,
    defendingUnits: hexes[defendingHexId].unit1,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    updateUnits(hexId, units) {
      firebase.ref(`/boards/${boardId}/hexes/${hexId}`).update({ unit1: units })
    },
    endCombat() {
      ownProps.history.push(`/boards/${boardId}`);
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CombatRisk));
