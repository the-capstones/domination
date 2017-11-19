import axios from 'axios';

// ACTION TYPES

const SET_HEXAGONS = 'SET_HEXAGONS';
const UPDATE_HEX = 'UPDATE_HEX';

// INITIAL STATE

const defaultHexagons = [];

// ACTION CREATORS

// ACTION CREATORS

export const setHexagons = hexagons => ({ type: SET_HEXAGONS, hexagons });

export const updateHex = (hexId, updatedProps) => ({
  type: UPDATE_HEX,
  hexId,
  updatedProps,
});

//THUNK CREATORS

//REDUCER

export default function (state = defaultHexagons, action) {
  switch (action.type) {
    case SET_HEXAGONS:
      return action.hexagons;
    case UPDATE_HEX:
      return state.map(hex => (
        hex.id === action.hexId
          ? Object.assign({}, hex, action.updatedProps)
          : hex
      ));
    default:
      return state
  }
}

