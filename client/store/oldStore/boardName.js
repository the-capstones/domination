// ACTION TYPES

const SET_BOARD_NAME = 'SET_BOARD_NAME';

// INITIAL STATE

const defaultBoardName = '';

// ACTION CREATORS

export const setBoardName = boardName => ({type: SET_BOARD_NAME, boardName});

// THUNK CREATORS


// REDUCER

export default function (state = defaultBoardName, action) {
  switch (action.type) {
    case SET_BOARD_NAME:
      return action.boardName;
    default:
      return state
  }
}
