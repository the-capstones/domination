import React from 'react'
import { connect } from 'react-redux'
import { GridGenerator } from 'react-hexgrid';
import configs from '../configurations';
import '../css/_auth-form.scss';
import firebase from '../firebase'

// COMPONENT

const NewGame = (props) => {
  console.log('PROPS ARE', props)
  return (
    <div className="form">
      <h1>Start a New Game</h1>
      <form onSubmit={props.handleSubmit}>
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

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const boardName = evt.target.boardName.value;
      const maxPlayers = evt.target.maxPlayers.value || 2;

      // send board to firebase
      const config = configs['rectangle'];
      const generator = GridGenerator.getGenerator(config.map);
      const hexagons = generator.apply(this, config.mapProps);
      let hexes = {}

      hexagons.forEach(hex => {
        hex.id = `${hex.q},${hex.r},${hex.s}`;
        hexes[hex.id] = {
          movesLeft: 2,
          playerId: '',
          unit1: 0,
          unit2: 0,
          unit3: 0
        }
      });

      let state = {
        currentPhase: { allotment: 0 }, // or whatever default state
        currentPlayer: 1, // default 1st player
        playerOrder: [1, 2, 3, 4], // array of all players in order of turn
        gameSettings: 'default', // array/obj of game settings TBD
        status: 'waiting'
      }

      let board = { hexes, state, boardName, maxPlayers }
      firebase
        .ref('boards')
        .push(board)
        .then(snap => ownProps.history.push(`/board/${snap.key}`))
    }
  }
}

const NewGameContainer = connect(null, mapDispatch)(NewGame)
export default NewGameContainer
