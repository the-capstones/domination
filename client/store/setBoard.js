// ACTION TYPES

const SET_BOARD = 'SET_BOARD';
const REMOVE_BOARD = 'REMOVE_BOARD'

// INITIAL STATE

const defaultBoard = {};

// ACTION CREATORS

export const setBoard = board => ({type: SET_BOARD, board})

//THUNK CREATORS


//REDUCER

export default function (state = defaultBoard, action) {
  switch (action.type) {
    case SET_BOARD:
      return action.board;
    default:
      return state
  }
}

