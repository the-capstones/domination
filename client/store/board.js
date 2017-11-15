import axios from 'axios';
import configs from '../configurations';


/**
 * ACTION TYPES
 */
const SET_BOARD = 'SET_BOARD'

/**
 * INITIAL STATE
 */
const defaultBoard = {
  config: {},
  hexagons: {},
}

/**
 * ACTION CREATORS
 */
export const setBoard = board => ({type: SET_BOARD, board})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultBoard, action) {
  switch (action.type) {
    case SET_BOARD:
      return action.board
    default:
      return state
  }
}
