import React from 'react'
import { connect } from 'react-redux'
import { createGrid } from '../functions'
import configs from '../configurations';
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
        <div className="max-players">
          <label htmlFor="maxPlayers"><small>Number of Players:</small></label>
          <input name="maxPlayers" type="number" defaultValue="2" min="2" max="5" />
        </div>
        <div className="max-players">
          <label htmlFor="AIPlayers"><small>Number of AI Players:</small></label>
          <input name="AIPlayers" type="number" defaultValue="0" min="0" max="4" />
        </div>
        <div className="gameSettings">
          <div>
            <label htmlFor="boardSize"><small>Board size:</small></label>
            <select name="boardSize">
              <option value={'rectangle-small'} >Small</option>
              <option value={'rectangle-medium'} >Medium</option>
              <option value={'rectangle-large'} >Large</option>
              {
                // <option value={'rectangle-epic'} >Epic</option>
              }
              <option value={'hexagon'} >Hexagon</option>
            </select>
          </div>
          <div>
            <label htmlFor="percentVoid"><small>Void spaces:</small></label>
            <input name="percentVoidSpaces" type="number" min="0" max="90" defaultValue="20" />
            <label><small> %</small></label>
          </div>
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
      const AIPlayers = evt.target.AIPlayers.value || 0;
      const AIPlayerNames = ['AI-Zero', 'AI-Eleven', 'AI-FortyTwo', 'AI-TwoThousand']
      let playerOrder = [user.username].concat(AIPlayerNames.slice(0, AIPlayers))
      let boardSize = evt.target.boardSize.value;
      const boardConfig = configs[boardSize]
      const percentVoidSpaces = evt.target.percentVoidSpaces.value / 100;
      const hexagons = createGrid(boardConfig)
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
        playerOrder: playerOrder, // array of all players in order of turn
        allotmentPointsPerTurn: { [user.username]: 3 }, //obj of points(val) per player(key) per turn
        allotmentLeft: 3,
        percentVoidSpaces: percentVoidSpaces,
        boardLayout: boardConfig,
        hexagons: hexagons,
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'waiting',
        selectedHex: '',
        prevSelectedHex: '',
        playerClasses: {},
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
