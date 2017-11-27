import React from 'react'
import { connect } from 'react-redux'
import { createGrid } from '../functions'
import { setInGame } from '../store';
import firebase from '../firebase';

import '../css/_auth-form.scss';

// COMPONENT

const NewGame = (props) => {
  const { user } = props

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

          <div className="gameSettings">
            <label htmlFor="boardSize"><small>Board size:</small></label>
            <select name="boardSize">
              <option value={'rectangle-small'} >Small</option>
              <option value={'rectangle-medium'} >Medium</option>
              <option value={'rectangle-large'} >Large</option>
              <option value={'rectangle-epic'} >Epic</option>
            </select>

            <label htmlFor="percentVoid"><small>Percentage of void spaces:</small></label>
            <input name="percentVoidSpaces" type="number" min="0" max="90" />
          </div>

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
      let boardSize = evt.target.boardSize.value;
      const percentVoidSpaces = evt.target.percentVoidSpaces.value / 100;
      const hexagons = createGrid(boardSize)
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

      const state = {
        currentPhase: 'allotment', // or whatever default state 'start' should be default for distribution
        currentPlayer: user.username, // default 1st player
        playerOrder: [user.username], // array of all players in order of turn
        allotmentPointsPerTurn: { [user.username]: 3 }, //obj of points(val) per player(key) per turn
        allotmentLeft: 3,
        percentVoidSpaces: percentVoidSpaces,
        hexagons: hexagons,
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'waiting',
        selectedHex: '',
        prevSelectedHex: ''
      }

      const board = { hexes, state, boardName, maxPlayers }
      firebase.ref('boards').push(board)
        .then(snap => ownProps.history.push(`/boards/${snap.key}`));
      dispatch(setInGame(true));
    }
  }
}

const NewGameContainer = connect(mapState, mapDispatch)(NewGame)
export default NewGameContainer
