'use strict'
/* eslint "no-return-assign": 0 */
const validBoardCheck = require('./validBoard')


const PERCENT_DISABLED = 0.20;


const divvySpaces = (players, board) => {
  let validBoard = false;

  while (!validBoard) {
    const numPlayers = players.length;
    let numSpaces = Object.keys(board).length;
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
    let playerSpaceAssignment = { 0: numVoidSpaces }

    players.forEach(player => playerSpaceAssignment[player.id] = spacesPerPlayer)


    let assignment = [
      { playerId: '', amount: numVoidSpaces },
      { playerId: 'red', amount: spacesPerPlayer },
      { playerId: 'blue', amount: spacesPerPlayer },
      { playerId: 'yellow', amount: spacesPerPlayer },
      { playerId: 'green', amount: spacesPerPlayer },
      { playerId: 'orange', amount: spacesPerPlayer },
    ]

    // used for validBoardCheck
    let initialValidHex;

    const boardCopy = Object.assign({}, board);

    Object.keys(boardCopy).forEach(id => {
      let successfulAssign = false;
      while (!successfulAssign) {
        const assign = Math.floor(Math.random() * (numPlayers + 1));
        // const assignment = assignmentColors[assign];
        const player = players[assign];
        const hex = boardCopy[id];

        if (assignment.amount > 0) {
          assignment.amount--;
          hex.playerId = player;
          successfulAssign = true;
        }
        if (!initialValidHex && boardCopy[id].playerId !== '') initialValidHex = id;
      }
    });

    if (validBoardCheck(initialValidHex, boardCopy)) {
      validBoard = true;
    }
  }
}

module.exports = { divvySpaces }
