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
        <div className="gameSettings">
        <div className="max-players">
          <label htmlFor="maxPlayers"><small>Number of Human Players:</small></label>
          <select name="maxPlayers">
            <option value={1} >1</option>
            <option value={2} >2</option>
            <option value={3} >3</option>
            <option value={4} >4</option>
            <option value={5} >5</option>
          </select>
        </div>
        <div className="max-players">
        <label htmlFor="AIPlayers"><small>Number of AI Players:</small></label>
        <select name="AIPlayers">
          <option value={0} >0</option>
          <option value={1} >1</option>
          <option value={2} >2</option>
          <option value={3} >3</option>
          <option value={4} >4</option>
        </select>
      </div>
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
            <select name="percentVoid">
              <option value={0} >0</option>
              <option value={5} >5</option>
              <option value={10} >10</option>
              <option value={15} >15</option>
              <option value={20} >20</option>
              <option value={25} >25</option>
              <option value={30} >30</option>
              <option value={35} >35</option>
              <option value={40} >40</option>
              <option value={45} >45</option>
              <option value={50} >50</option>
            </select>
            <label><small> %</small></label>
          </div>

          <div>
            <label htmlFor="allotmentRate"><small>Recieve an army for every </small></label>
            <select name="allotmentRate">
              <option value={10} >10</option>
              <option value={9} >9</option>
              <option value={8} >8</option>
              <option value={7} >7</option>
              <option value={6} >6</option>
              <option value={5} >5</option>
              <option value={4} >4</option>
              <option value={3} >3</option>
              <option value={2} >2</option>
              <option value={1} >1</option>
            </select>
            <label><small> territories owned.</small></label>
          </div>

          <div>
            <label htmlFor="landmarksFreq"><small>Landmark frequency: </small></label>
            <select name="landmarksFreq">
              <option value={0} >Off</option>
              <option value={1} >1</option>
              <option value={2} >2</option>
              <option value={3} >3</option>
              <option value={4} >4</option>
              <option value={5} >5</option>
              <option value={6} >6</option>
              <option value={7} >7</option>
              <option value={8} >8</option>
              <option value={9} >9</option>
              <option value={10} >10</option>
            </select>
          </div>

          <div>
            <label htmlFor="landmarksValue"><small>Landmark bonus amount: </small></label>
            <select name="landmarksValue">
              <option value={0} >0</option>
              <option value={1} >1</option>
              <option value={2} >2</option>
              <option value={3} >3</option>
              <option value={4} >4</option>
              <option value={5} >5</option>
              <option value={6} >6</option>
              <option value={7} >7</option>
              <option value={8} >8</option>
              <option value={9} >9</option>
              <option value={10} >10</option>
            </select>
          </div>
        </div>

        <div>
          <button type="submit">Start Game</button>
        </div>
      </form>
    </div>
  )
}

const mapState = state => ({
  user: state.user,
  landmarksOn: state.landmarksOn
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt, user) {
      evt.preventDefault();
      const landmarksFreq = evt.target.landmarksFreq.value;
      const landmarksValue = evt.target.landmarksValue.value;
      const boardName = evt.target.boardName.value;
      const humanPlayers = evt.target.maxPlayers.value;
      const AIPlayers = evt.target.AIPlayers.value || 0;
      const maxPlayers = (+AIPlayers + +humanPlayers) || 2
      const AIPlayerNames = ['AI-Zero', 'AI-Eleven', 'AI-FortyTwo', 'AI-TwoThousand']
      let playerOrder = [user.username].concat(AIPlayerNames.slice(0, AIPlayers))
      let boardSize = evt.target.boardSize.value;
      const boardConfig = configs[boardSize]
      const percentVoid = evt.target.percentVoid.value / 100;
      const allotmentRate = evt.target.allotmentRate.value;
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
        allotmentRate: allotmentRate,
        allotmentPointsPerTurn: { [user.username]: 3 }, //obj of points(val) per player(key) per turn
        allotmentLeft: 3,
        percentVoidSpaces: percentVoid,
        boardLayout: boardConfig,
        hexagons: hexagons,
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'waiting',
        selectedHex: '',
        prevSelectedHex: '',
        playerClasses: {},
        landmarksFreq: landmarksFreq,
        landmarksValue: landmarksValue,
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
