// ACTION TYPES

const SET_BOARD = 'SET_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD'

// INITIAL STATE

const defaultBoard = {};

// ACTION CREATORS

export const setBoard = board => ({type: SET_BOARD, board})

export const removeBoard = () => ({type: REMOVE_BOARD})

//THUNK CREATORS


//REDUCER

export default function (state = defaultBoard, action) {
  switch (action.type) {
    case SET_BOARD:
      return action.board;
    case REMOVE_BOARD:
      return {}
    default:
      return state
  }
}

