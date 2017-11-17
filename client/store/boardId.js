import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_BOARD_ID = 'SET_BOARD_ID';

/**
 * INITIAL STATE
 */
const defaultBoardId = null;
/**
 * ACTION CREATORS
 */
export const setBoardId = boardId => ({type: SET_BOARD_ID, boardId});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultBoardId, action) {
  switch (action.type) {
    case SET_BOARD_ID:
      return action.boardId;
    default:
      return state
  }
}
