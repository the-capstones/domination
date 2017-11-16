import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_IN_GAME = 'SET_IN_GAME';

/**
 * INITIAL STATE
 */
const defaultInGame = false;

/**
 * ACTION CREATORS
 */
export const setInGame = inGame => ({type: SET_IN_GAME, inGame});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultInGame, action) {
  switch (action.type) {
    case SET_IN_GAME:
      return action.inGame;
    default:
      return state
  }
}
