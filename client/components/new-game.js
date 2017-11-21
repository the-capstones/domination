import React from 'react'
import { connect } from 'react-redux'
import { hexagons } from '../functions'
import '../css/_auth-form.scss';
import firebase from '../firebase'

// COMPONENT

const NewGame = (props) => {
  const { user } = props
  console.log(user)
  return (
    <div className="form">
      <h1>Start a New Game</h1>
      <form onSubmit={evt => props.handleSubmit(evt, user)}>
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

const mapState = state => ({ user: state.user })

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault();
      const boardName = evt.target.boardName.value;
      const maxPlayers = evt.target.maxPlayers.value || 2;
      let hexes = {}

      hexagons.forEach(hex => {
        hex.id = `${hex.q},${hex.r},${hex.s}`;
        hexes[hex.id] = {
          movesLeft: 2,
          playerId: '',
          unit1: 1,
          unit2: 0,
          unit3: 0
        }
      });

      let state = {
        currentPhase: 'allotment', // or whatever default state 'start' should be default for distribution
        currentPlayer: user.username, // default 1st player
        playerOrder: [user.username], // array of all players in order of turn
        allotmentPointsPerTurn: { [user.username]: 3 }, //obj of points(val) per player(key) per turn
        allotmentLeft: 3,
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'waiting'
      }

      let board = { hexes, state, boardName, maxPlayers }
      firebase
        .ref('boards')
        .push(board)
        .then(snap => ownProps.history.push(`/boards/${snap.key}`))
    }
  }
}

const NewGameContainer = connect(mapState, mapDispatch)(NewGame)
export default NewGameContainer
