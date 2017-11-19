import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_GAME_SETTINGS = 'SET_GAME_SETTINGS';

/**
 * INITIAL STATE
 */
const defaultGameSettings = {
  gameMode: 'Risk Rules',
};

/**
 * ACTION CREATORS
 */
export const setGameSettings = settings => ({type: SET_GAME_SETTINGS, settings});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultGameSettings, action) {
  switch (action.type) {
    case SET_GAME_SETTINGS:
      return action.settings
    default:
      return state
  }
}
