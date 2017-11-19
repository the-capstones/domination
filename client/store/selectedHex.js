import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_SELECTED_HEX = 'SET_SELECTED_HEX';

/**
 * INITIAL STATE
 */
const defaultSelectedHex = '';

/**
 * ACTION CREATORS
 */
export const setSelectedHex = hex => ({type: SET_SELECTED_HEX, hex});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultSelectedHex, action) {
  switch (action.type) {
    case SET_SELECTED_HEX:
      return action.hex
    default:
      return state
  }
}
