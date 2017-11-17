import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import hexagons from './boardHexagon';
import config from './boardConfig';
import boardId from './boardId';
import gameSettings from './gameSettings';
import playerOrder from './playerOrder';
import currentPlayer from './currentPlayer';
import currentPhase from './currentPhase';
import inGame from './inGame';
import gameId from './gameId';

const state = combineReducers({
  gameSettings,
  playerOrder,
  currentPlayer,
  currentPhase,
});

const board = combineReducers({
  boardId,
  hexagons,
  config,
  state,
});

const reducer = combineReducers({
  user,
  board,
  inGame,
  gameId
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
export * from './boardId';
export * from './inGame';
export * from './gameId';
