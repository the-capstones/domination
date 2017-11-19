import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER';

/**
 * INITIAL STATE
 */
const defaultCurrentPlayer = 'zeke@zeke.zeke';

/**
 * ACTION CREATORS
 */
export const setCurrentPlayer = currentPlayer => ({type: SET_CURRENT_PLAYER, currentPlayer});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultCurrentPlayer, action) {
  switch (action.type) {
    case SET_CURRENT_PLAYER:
      return action.currentPlayer
    default:
      return state
  }
}
