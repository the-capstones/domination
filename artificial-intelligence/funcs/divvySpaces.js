'use strict'
const { validBoardCheck } = require('./validBoard');

const PERCENT_DISABLED = 0.20;

const divvySpaces = (playerOrder, hexes) => {
  let validBoard = false;

  while (!validBoard) {
    const players = [{id: ''}, ...playerOrder];
    const numPlayers = playerOrder.length;
    let numSpaces = Object.keys(hexes).length;
    let numVoidSpaces = Math.floor(numSpaces * PERCENT_DISABLED);
    let numAllotSpaces = numSpaces - numVoidSpaces;

    // distributes spaces evenly to players
    if (numAllotSpaces % numPlayers !== 0) {
      let numExtra = numAllotSpaces % numPlayers;
      numVoidSpaces += numExtra;
      numAllotSpaces -= numExtra;
    }

    const spacesPerPlayer = numAllotSpaces / numPlayers;

    // maps to players order 0: disabled, 1: player1 ...
    let assignmentObj = [
      { amount: numVoidSpaces },
      { amount: spacesPerPlayer },
      { amount: spacesPerPlayer },
      { amount: spacesPerPlayer },
      { amount: spacesPerPlayer },
      { amount: spacesPerPlayer },
    ]

    // used for validBoardCheck
    let initialValidHex;

    const hexesCopy = Object.assign({}, hexes);

    Object.keys(hexesCopy).forEach(id => {
      let successfulAssign = false;
      while (!successfulAssign) {
        const assign = Math.floor(Math.random() * (numPlayers + 1));
        const assignment = assignmentObj[assign];
        const player = players[assign];
        const hex = hexesCopy[id];

        if (assignment.amount > 0) {
          assignment.amount--;
          hex.playerId = player.id;
          successfulAssign = true;
        }
        if (!initialValidHex && hexesCopy[id].playerId !== '') initialValidHex = id;
      }
    });

    if (validBoardCheck(initialValidHex, hexesCopy)) {
      validBoard = true;
    }
  } //while !validBoard
}

module.exports = { divvySpaces }
