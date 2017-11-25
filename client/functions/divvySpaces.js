import firebase from '../firebase';
import { validBoardCheck } from './';

const PERCENT_DISABLED = .20;

export const divvySpaces = (playerOrder, hexes, boardId) => {
  let validBoard = false;

  while (!validBoard) {
    const players = ['', ...playerOrder];
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
    let assignmentColors = [
      { color: 'black', amount: numVoidSpaces },
      { color: 'red', amount: spacesPerPlayer },
      { color: 'blue', amount: spacesPerPlayer },
      { color: 'yellow', amount: spacesPerPlayer },
      { color: 'green', amount: spacesPerPlayer },
      { color: 'orange', amount: spacesPerPlayer },
    ]

    // used for validBoardCheck
    let initialValidHex;

    const hexesCopy = Object.assign({}, hexes);

    Object.keys(hexesCopy).forEach(id => {
      let successfulAssign = false;
      while (!successfulAssign) {
        const assign = Math.floor(Math.random() * (numPlayers + 1));
        const assignment = assignmentColors[assign];
        const player = players[assign];
        const hex = hexesCopy[id];

        if (assignment.amount > 0) {
          assignment.amount--;
          hex.playerId = player;
          successfulAssign = true;
        }
        if (!initialValidHex && hexesCopy[id].playerId !== '') initialValidHex = id;
      }
    });

    if (validBoardCheck(initialValidHex, hexesCopy)) {
      validBoard = true;
      firebase.ref(`/boards/${boardId}`).update({ hexes: hexesCopy })
    }
  } //while !validBoard
}

export const addColors = (playerOrder, hexes, theme) => {
  const players = ['', ...playerOrder];
  let colors = ['black', 'red', 'blue', 'yellow', 'green', 'orange'];
  let removeColors = ['hex-fill-red', 'hex-fill-black', 'hex-fill-blue', 'hex-fill-yellow', 'hex-fill-green', 'hex-fill-orange']
  if (theme === 'redStyle'){
    colors = ['redStyle-black', 'redStyle-purple', 'redStyle-yellow', 'redStyle-pink', 'redStyle-green', 'redStyle-orange']
    removeColors = ['hex-fill-redStyle-black',
    'hex-fill-redStyle-purple',
    'hex-fill-redStyle-yellow',
    'hex-fill-redStyle-pink',
    'hex-fill-redStyle-green', 'hex-fill-redStyle-orange']
  }
  if (hexes) {
    Object.keys(hexes).forEach(id => {
      const hex = document.getElementById(id)
      const username = hexes[id].playerId;
      const playerId = players.indexOf(username);
      hex.classList.remove(...removeColors)
      hex.classList.add(`hex-fill-${colors[playerId]}`);
      // use the line below to test all the design colors without having 
      // to make a game with 5 people
      // hex.classList.add(`hex-fill-${colors[getRandomIntInclusive(0, 5)]}`);
    })
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
