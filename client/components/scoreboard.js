import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import '../css/_scoreboard.scss';

const Scoreboard = (props) => {
  const {
    user,
    hexes,
    playerOrder,
    allotmentPointsPerTurn,
    allotmentRate,
    closeScoreboard
  } = props;
  const colors = ['#b3482e', '#6f9bc4', '#d5a149', '#83ada0', '#c7723d'];

  return (
    <div className="scoreboard-wrapper">
      <div className="title">
        <h1>Scoreboard</h1>
      </div>
      <div className="scoreboard">
        <div className="scoreboard-player">
          <div className="scoreboard-colors"></div>
          <div>Player</div>
          <div>Territories Owned</div>
          <div>Landmarks Owned</div>
          <div>Allotment Points Per Turn</div>
        </div>
        {
          playerOrder.map(player => (
            <div className="scoreboard-player">
              <div
                className="scoreboard-colors"
                style={{ background: colors[playerOrder.indexOf(player)] }}>
              </div>

              <div>
                {player}
              </div>

              <div>
                {
                  hexes && Object.entries(hexes).filter(([key, hex]) => hex.playerId === player).length
                }
              </div>

              <div>
                {
                  hexes && Object.entries(hexes).filter(([key, hex]) => hex.playerId === player && hex.tile.startsWith('medieval')).length
                }
              </div>

              <div>
                {allotmentPointsPerTurn[player]}
              </div>

            </div>
          ))
        }
        <button onClick={closeScoreboard}>Close</button>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder,
    allotmentRate: state.board.state.allotmentRate,
    allotmentPointsPerTurn: state.board.state.allotmentPointsPerTurn,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    closeScoreboard() {
      ownProps.history.push(`/boards/${boardId}`);
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Scoreboard));

/**
 * PROP TYPES
 */
Scoreboard.propTypes = {

}
