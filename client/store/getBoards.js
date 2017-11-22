

/**
 * ACTION TYPES
 */
const GET_BOARDS = 'GET_BOARDS';

/**
 * INITIAL STATE
 */
const defaultList = [];

/**
 * ACTION CREATORS
 */
export const getBoards = boards => ({type: GET_BOARDS, boards});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultList, action) {
  switch (action.type) {
    case GET_BOARDS:
      return action.boards
    default:
      return state
  }
}
