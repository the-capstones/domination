import axios from 'axios';
import firebase from '../firebase'

// ACTION TYPES

const SET_GAME_ID = 'SET_GAME_ID'

// INITIAL STATE

const defaultGameId = ''

// ACTION CREATORS

export const setGameId = gameId => ({type: SET_GAME_ID, gameId})

// THUNK CREATORS


// REDUCER

export default function (state = defaultGameId, action) {
  switch (action.type) {
    case SET_GAME_ID:
      return action.gameId
    default:
      return state
  }
}
