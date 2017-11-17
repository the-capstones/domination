import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import hexagon from './boardHexagon';
import config from './boardConfig';
<<<<<<< HEAD
import boardId from './boardId';
import gameSettings from './gameSettings';
import playerOrder from './playerOrder';
import currentPlayer from './currentPlayer';
import currentPhase from './currentPhase';
=======
import inGame from './inGame';
>>>>>>> master

const state = combineReducers({
  gameSettings,
  playerOrder,
  currentPlayer,
  currentPhase,
});

const board = combineReducers({
  boardId,
  hexagon,
  config,
  state,
});

const reducer = combineReducers({
  user,
  board,
  inGame,
});

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));

const store = createStore(reducer, middleware);

export default store
export * from './user';
export * from './boardHexagon';
export * from './boardConfig';
<<<<<<< HEAD
export * from './boardId';
=======
export * from './inGame';
>>>>>>> master
