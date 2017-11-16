import {createStore, combineReducers, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './user';
import hexagon from './boardHexagon';
import config from './boardConfig';
import inGame from './inGame';

const board = combineReducers({ hexagon, config });

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
export * from './inGame';
