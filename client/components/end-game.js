import React from 'react'
import { connect } from 'react-redux'
import { setInGame } from '../store';

import '../css/_auth-form.scss';

// COMPONENT

const EndGame = (props) => {
  const { gameStatus, name, returnToMenu, returnToMatch } = props

  return (
    <div id="end-screen">
      <div id="end-message">
        <h1>{name}</h1>
        <h2>is</h2>
        <h1>Victorious.</h1>
      </div>

      {
        gameStatus === 'playing'
          && <button onClick={returnToMatch}>Spectate</button>
      }

      <button onClick={returnToMenu}>Back to Menu</button>
      <div className="back-pannel" />
    </div>
)
}

const mapState = state => {

  return {
    gameStatus: state.board.state.status,
    name: state.user.username
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    returnToMenu() {
      ownProps.history.push('/');
    },
    returnToMatch() {
      ownProps.history.push(`/boards/${boardId}`)
    }
  }
}

const EndGameContainer = connect(mapState, mapDispatch)(EndGame)
export default EndGameContainer
