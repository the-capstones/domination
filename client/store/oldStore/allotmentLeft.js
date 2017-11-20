import axios from 'axios';

/**
 * ACTION TYPES
 */
const SET_ALLOTMENT_LEFT = 'SET_ALLOTMENT_LEFT';

/**
 * INITIAL STATE
 */
const defaultAllotmentLeft = 1;

/**
 * ACTION CREATORS
 */
export const setAllotmentLeft = allotmentLeft => ({type: SET_ALLOTMENT_LEFT, allotmentLeft});

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function (state = defaultAllotmentLeft, action) {
  switch (action.type) {
    case SET_ALLOTMENT_LEFT:
      return action.allotmentLeft
    default:
      return state
  }
}
