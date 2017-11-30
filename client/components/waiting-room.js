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

          <div className="socket">
            <div className="gel center-gel">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c1 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c2 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c3 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c4 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c5 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c6 r1">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>

            <div className="gel c7 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>

            <div className="gel c8 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c9 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c10 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c11 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c12 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c13 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c14 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c15 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c16 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c17 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c18 r2">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c19 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c20 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c21 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c22 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c23 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c24 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c25 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c26 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c28 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c29 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c30 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c31 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c32 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c33 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c34 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c35 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c36 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
            </div>
            <div className="gel c37 r3">
              <div className="hex-brick h1"></div>
              <div className="hex-brick h2"></div>
              <div className="hex-brick h3"></div>
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
                onClick={(evnt) => props.startGame(evnt, board.state.playerOrder, board.hexes, board.state.percentVoidSpaces, board.state.landmarksFreq)}
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
      console.log('WAITING ', landmarkFreq)
      divvySpaces(playerOrder, hexes, boardId, percentVoid, landmarkFreq);
      dispatch(setInGame(true));
      firebase.ref(`/boards/${boardId}/state`).update({ status: 'playing' });
    }
  }
}
const WaitingRoomContainer = withRouter(connect(mapState, mapDispatch)(WaitingRoom))

export default WaitingRoomContainer

