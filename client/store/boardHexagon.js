import axios from 'axios';
import firebase from '../firebase'

// ACTION TYPES

const SET_HEXAGONS = 'SET_HEXAGONS';
const UPDATE_HEX = 'UPDATE_HEX';

// INITIAL STATE

const defaultHexagons = [];

// ACTION CREATORS


/**
 * ACTION CREATORS
 */
export const setHexagons = hexagons => ({ type: SET_HEXAGONS, hexagons });

export const updateHex = (hexId, updatedProps) => ({
  type: UPDATE_HEX,
  hexId,
  updatedProps,
});

//THUNK CREATORS

export const initializeBoard = (hexagons) => dispatch => {
  dispatch(setHexagons(hexagons));
  let hexIds = hexagons.map(hex => `${hex.q},${hex.r},${hex.s}`)
  let state = {
    currentPhase: 'start', // or whatever default state
    currentPlayer: 1, // default 1st player
    playerOrder: [], // array of all players in order of turn
    gameSettings: [] // array of game settings TBD
  }
  firebase.ref('boards').push({hexes: hexIds, state })
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

