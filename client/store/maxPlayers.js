import axios from 'axios';
import firebase from '../firebase'

// ACTION TYPES

const SET_MAX_PLAYERS = 'SET_MAX_PLAYERS';

// INITIAL STATE

const defaultMaxPlayers = 2;

// ACTION CREATORS

export const setMaxPlayers = maxPlayers => ({type: SET_MAX_PLAYERS, maxPlayers});

// THUNK CREATORS


// REDUCER

export default function (state = defaultMaxPlayers, action) {
  switch (action.type) {
    case SET_MAX_PLAYERS:
      return action.maxPlayers;
    default:
      return state
  }
}
