import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom';
import  {auth, setInGame, setBoardName, setMaxPlayers, setBoardId } from '../store'

import '../css/_auth-form.scss';

// COMPONENT

const NewGame = (props) => {
  const { handleSubmit } = props

  return (
    <div className="form">
      <h1>Start a New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="boardName"><small>Game Room Name</small></label>
          <input name="boardName" type="text" />
        </div>
        <div>
          <label htmlFor="maxPlayers"><small>Max # of Players</small></label>
          <input name="maxPlayers" type="text" />
        </div>
        <div>Select game settings</div>
        <div>
          <button type="submit">Start Game</button>
        </div>
      </form>
    </div>
  )
}


const mapState = (state) => {
  return {

  }
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const boardName = evt.target.boardName.value;
      const maxPlayers = evt.target.maxPlayers.value;
      dispatch(setBoardName(boardName));
      dispatch(setMaxPlayers(maxPlayers));
      dispatch(setInGame(true))
      ownProps.history.push('/play')
    }
  }
}
const NewGameContainer = withRouter(connect(mapState, mapDispatch)(NewGame))

export default NewGameContainer
