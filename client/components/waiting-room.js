import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setInGame } from '../store';
import firebase from '../firebase'
import { divvySpaces } from '../functions';

import '../css/_room.scss';
import '../css/_loading-animation.scss';

const WaitingRoom = (props) => {
  const { board, user } = props
  const maxPlayers = board.maxPlayers
  const numPlayers = board.state.playerOrder.length

  return (
    <div id="waiting-room">
      <div id="waiting-room-content">
        <div><p>Waiting for game to start</p></div>
        <div className="center">

          <div class="socket">
            <div class="gel center-gel">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c1 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c2 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c3 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c4 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c5 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c6 r1">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>

            <div class="gel c7 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>

            <div class="gel c8 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c9 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c10 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c11 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c12 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c13 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c14 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c15 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c16 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c17 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c18 r2">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c19 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c20 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c21 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c22 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c23 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c24 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c25 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c26 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c28 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c29 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c30 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c31 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c32 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c33 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c34 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c35 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c36 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>
            <div class="gel c37 r3">
              <div class="hex-brick h1"></div>
              <div class="hex-brick h2"></div>
              <div class="hex-brick h3"></div>
            </div>

          </div>

        </div>
        <div><p>{numPlayers}/{maxPlayers} players in room</p></div>
        {user.username === board.state.currentPlayer &&
          (
            <div className="center">
              <button
                className="text"
                type="submit"
                onClick={(evnt) => props.startGame(evnt, board.state.playerOrder, board.hexes, board.state.percentVoidSpaces, board.state.board.landmarkFreq)}
              >
                Start Game
              </button>
            </div>
          )
        }
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    board: state.board,
    user: state.user,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    startGame(evnt, playerOrder, hexes, percentVoid, landmarkFreq) {
      evnt.preventDefault();
      const boardId = ownProps.match.params.boardId;
      divvySpaces(playerOrder, hexes, boardId, percentVoid, landmarkFreq);
      dispatch(setInGame(true));
      firebase.ref(`/boards/${boardId}/state`).update({ status: 'playing' });
    }
  }
}
const WaitingRoomContainer = withRouter(connect(mapState, mapDispatch)(WaitingRoom))

export default WaitingRoomContainer

