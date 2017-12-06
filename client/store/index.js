import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import board from './setBoard'
import boardsList from './getBoards'

const reducer = combineReducers({
  user,
  board,
  boardsList
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store
export * from './user';
export * from './setBoard';
export * from './getBoards';

// import hexagons from './boardHexagon';
// import config from './boardConfig';
// import boardId from './boardId';
// import boardName from './boardName';
// import maxPlayers from './maxPlayers';
// import gameSettings from './gameSettings';
// import playerOrder from './playerOrder';
// import currentPlayer from './currentPlayer';
// import currentPhase from './currentPhase';
// import selectedHex from './selectedHex';
// import allotmentLeft from './allotmentLeft';

// const state = combineReducers({
//   gameSettings,
//   playerOrder,
//   currentPlayer,
//   currentPhase,
  // allotmentLeft,
  // selectedHex,
// });

// const board = combineReducers({
//   boardId,
//   hexagons,
//   config,
//   state,
//   boardName,
//   maxPlayers
// });


// export * from './maxPlayers';
// export * from './boardHexagon';
// export * from './boardConfig';
// export * from './boardId';
// export * from './boardName';
// export * from './allotmentLeft';
// export * from './selectedHex';
// export * from './maxPlayers';
// export * from './currentPhase';
// export * from './currentPlayer';
// export * from './playerOrder';
// export * from './gameSettings';
