import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_CURRENT_PHASE = 'SET_CURRENT_PHASE';

/**
 * INITIAL STATE
 */
const defaultCurrentPhase = '';

/**
 * ACTION CREATORS
 */
export const setCurrentPhase = currentPhase => ({type: SET_CURRENT_PHASE, currentPhase});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultCurrentPhase, action) {
  switch (action.type) {
    case SET_CURRENT_PHASE:
      return action.currentPhase
    default:
      return state
  }
}
