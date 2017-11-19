import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'
import { setInGame } from '../store';

import '../css/_room.scss';

const WaitingRoom = (props) => {
  const { board, user } = props
  const maxPlayers = board.maxPlayers
  const currPlayers = board.state.playerOrder.length
  return (
    <div id="waiting-room">
      <div id="waiting-room-content">
        <div><p>Waiting for game to start</p></div>
        <div className="center"><i className="fa fa-cog fa-spin fa-5x fa-fw" /></div>
        <div><p>{currPlayers}/{maxPlayers} players in room</p></div>
        { user.id === board.state.currentPlayer &&
          (
            <div className="center">
              <button
                className="text"
                type="submit"
                onClick={props.startGame}
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
    startGame(evt){
      console.log('STARTING GAME')
      evt.preventDefault()
      const boardId = ownProps.match.params.boardId
      firebase.ref(`/boards/${boardId}/state`).update({status: 'playing'})
      dispatch(setInGame(true))
    }
  }
}
const WaitingRoomContainer = withRouter(connect(mapState, mapDispatch)(WaitingRoom))

export default WaitingRoomContainer

