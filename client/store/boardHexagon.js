import axios from 'axios';
import firebase from '../firebase'
import { setBoardId } from './boardId'

// ACTION TYPES

const SET_HEXAGONS = 'SET_HEXAGONS';
const UPDATE_HEX = 'UPDATE_HEX';

// INITIAL STATE

const defaultHexagons = [];

// ACTION CREATORS

// ACTION CREATORS

export const setHexagons = hexagons => ({ type: SET_HEXAGONS, hexagons });

export const updateHex = (hexId, updatedProps) => ({
  type: UPDATE_HEX,
  hexId,
  updatedProps,
});

//THUNK CREATORS

export const initializeBoard = (hexagons, boardName, maxPlayers) => dispatch => {
  dispatch(setHexagons(hexagons));
  let hexes = {}
  hexagons.forEach(function(hex) {
    hexes[hex.id] = {
      movesLeft: 2,
      playerId: '',
      unit1: 0,
      unit2: 0,
      unit3: 0
    }
  })
  let state = {
    currentPhase: {allotment: 0}, // or whatever default state
    currentPlayer: 1, // default 1st player
    playerOrder: [], // array of all players in order of turn
    gameSettings: [] // array of game settings TBD
  }
  let key = firebase.ref('boards').push({hexes, state, boardName, maxPlayers}).key
  dispatch(setBoardId(key))
}

//REDUCER

export default function (state = defaultHexagons, action) {
  switch (action.type) {
    case SET_HEXAGONS:
      return action.hexagons;
    case UPDATE_HEX:
      return state.map(hex => (
        hex.id === action.hexId
          ? Object.assign({}, hex, action.updatedProps)
          : hex
      ));
    default:
      return state
  }
}

