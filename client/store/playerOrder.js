import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_PLAYER_ORDER = 'SET_PLAYER_ORDER';

/**
 * INITIAL STATE
 */
const defaultPlayerOrder = [];

/**
 * ACTION CREATORS
 */
export const setPlayerOrder = playerOrder => ({type: SET_PLAYER_ORDER, playerOrder});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultPlayerOrder, action) {
  switch (action.type) {
    case SET_PLAYER_ORDER:
      return action.playerOrder
    default:
      return state
  }
}
