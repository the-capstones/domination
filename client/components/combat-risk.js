import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleRoll } from '../functions';

import '../css/_combat-risk.scss';

const CombatRisk = props => {
  const { endCombat, defendingUnits, attackingUnits, attackerName, defenderName } = props;

  return (
    <div id="combat-wrapper">
      <div id="combat-gui">
        <div className="combat">
          <div className="player-container">

            <div className="option-container">
              <label>{attackerName}</label>
            </div>

            <div className="unit-container">
              <label>
                {attackingUnits - 1} {attackingUnits - 1 === 1 ? 'UNIT' : 'UNITS'} REMAINING
              </label>
            </div>

            <div className="roll-container">
              <div className="die-container">
                <label>-</label>
              </div>

              <div className="die-container">
                <label>-</label>
              </div>

              <div className="die-container">
                <label>-</label>
              </div>
            </div>

          </div>

        <div className="result-box">
          <h3 id="result"></h3>
          <button onClick={() => handleRoll(props)}>ROLL</button>
          <button onClick={endCombat}>END COMBAT</button>
        </div>

        <div className="enemy-container">
          <div className="option-container">
            <label>{defenderName}</label>
          </div>

            <div className="enemy-unit-container">
              <label>
                {defendingUnits} {defendingUnits === 1 ? 'UNIT' : 'UNITS'} REMAINING
              </label>
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
        <div className="back-pannel" />
      </div>
  )
}

const mapState = (state, ownProps) => {
  const hexes = state.board.hexes;
  const attackingHexId = state.board.state.prevSelectedHex;
  const defendingHexId = state.board.state.selectedHex;
  const boardId = ownProps.match.params.boardId;

  return {
    boardId,
    hexes,
    defendingHexId,
    attackingHexId,
    attackingUnits: hexes[attackingHexId].unit1,
    defendingUnits: hexes[defendingHexId].unit1,
    attackerName: hexes[attackingHexId].playerId,
    defenderName: hexes[defendingHexId].playerId,
    playerOrder: state.board.state.playerOrder,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    endCombat() {
      ownProps.history.push(`/boards/${boardId}`);
      return true;
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CombatRisk));
