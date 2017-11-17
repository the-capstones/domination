import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom';
import  {auth, setInGame } from '../store'

import '../css/_auth-form.scss';

// COMPONENT

const NewGame = (props) => {
  const { handleSubmit } = props

  return (
    <div className="form">
      <h1>Start a New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gameName"><small>Game Room Name</small></label>
          <input name="gameName" type="text" />
        </div>
        <div>
          <label htmlFor="numPlayers"><small>Max # of Players</small></label>
          <input name="numPlayers" type="text" />
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
      const gameName = evt.target.gameName.value;
      const numPlayers = evt.target.numPlayers.value;

      dispatch(setInGame(true))
      ownProps.history.push('/play')

    }
  }
}
const NewGameContainer = withRouter(connect(mapState, mapDispatch)(NewGame))

export default NewGameContainer
