import axios from 'axios';

// ACTION TYPES

const SET_CONFIG = 'SET_CONFIG';

// INITIAL STATE

const defaultConfig = {
  config: {},
};

// ACTION CREATORS

export const setConfig = config => ({type: SET_CONFIG, config});

// THUNK CREATORS


// REDUCER

export default function (state = defaultConfig, action) {
  switch (action.type) {
    case SET_CONFIG:
      return action.config
    default:
      return state
  }
}
