import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_HEXAGONS = 'SET_HEXAGONS';

/**
 * INITIAL STATE
 */
const defaultHexagons = {
  hexagons: [],
};

/**
 * ACTION CREATORS
 */
export const setHexagons = hexagons => ({type: SET_HEXAGONS, hexagons});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultHexagons, action) {
  switch (action.type) {
    case SET_HEXAGONS:
      return action.hexagons;
    default:
      return state
  }
}
