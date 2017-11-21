import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setInGame } from '../store';
import firebase from '../firebase'

import '../css/_room.scss';
import { divvySpaces } from './divvySpaces';

const WaitingRoom = (props) => {
  const { board, user } = props
  const maxPlayers = board.maxPlayers
  const numPlayers = board.state.playerOrder.length

  return (
    <div id="waiting-room">
      <div id="waiting-room-content">
        <div><p>Waiting for game to start</p></div>
        <div className="center"><i className="fa fa-cog fa-spin fa-5x fa-fw" /></div>
        <div><p>{numPlayers}/{maxPlayers} players in room</p></div>
        { user.username === board.state.currentPlayer &&
          (
            <div className="center">
              <button
                className="text"
                type="submit"
                onClick={(evnt) => props.startGame(evnt, board.state.playerOrder, board.hexes)}
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
  return {board: state.board, user: state.user}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    startGame(evnt, playerOrder, hexes){
      evnt.preventDefault();
      const boardId = ownProps.match.params.boardId;
      divvySpaces(playerOrder, hexes, boardId);
      dispatch(setInGame(true));
      firebase.ref(`/boards/${boardId}/state`).update({status: 'playing'});
    }
  }
}
const WaitingRoomContainer = withRouter(connect(mapState, mapDispatch)(WaitingRoom))

export default WaitingRoomContainer

