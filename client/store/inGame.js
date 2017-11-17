import axios from 'axios';
import firebase from '../firebase';
import { setGameId } from './gameId';

// ACTION TYPES

const SET_IN_GAME = 'SET_IN_GAME';

// INITIAL STATE

const defaultInGame = false;

// ACTION CREATORS

export const setInGame = inGame => ({type: SET_IN_GAME, inGame});

// THUNK CREATORS

export const initializeBoard = inGame => dispatch => {
  console.log('INITIALIZING BOARD')
  dispatch(setInGame(inGame));

  firebase.ref('boards').push('hi')
  // let gameId = firebase.ref('boards').push().key
  // dispatch(setGameId(gameId))
}


// REDUCER

export default function (state = defaultInGame, action) {
  switch (action.type) {
    case SET_IN_GAME:
      return action.inGame;
    default:
      return state
  }
}
