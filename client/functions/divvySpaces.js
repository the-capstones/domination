import firebase from '../firebase';
import { validBoardCheck, spriteGenerator } from './';

const PERCENT_DISABLED = .20;
let AMOUNT_OF_LANDMARKS = 6;

export const divvySpaces = (playerOrder, hexes, boardId, amountVoid, amountLandmark) => {
  let validBoard = false;
  let percentVoid = amountVoid || PERCENT_DISABLED;
  AMOUNT_OF_LANDMARKS = amountLandmark || AMOUNT_OF_LANDMARKS;

  while (!validBoard) {
    const players = ['', ...playerOrder];
    const numPlayers = playerOrder.length;
    let numSpaces = Object.keys(hexes).length;
    let numVoidSpaces = Math.floor(numSpaces * percentVoid);
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

    const sprites = spriteGenerator('medieval');
    let landmarksAvailable = [];

    // used for validBoardCheck
    let initialValidHex;

    const hexesCopy = Object.assign({}, hexes);
    const copyKeys = Object.keys(hexesCopy);

    while (landmarksAvailable.length < AMOUNT_OF_LANDMARKS) {
      const randomHex = Math.floor(Math.random() * copyKeys.length);
      landmarksAvailable.push(copyKeys[randomHex]);
    }

    copyKeys.forEach(id => {
      let successfulAssign = false;
      while (!successfulAssign) {
        // player
        const assign = Math.floor(Math.random() * (numPlayers + 1));
        const assignment = assignmentColors[assign];
        const player = players[assign];
        const hex = hexesCopy[id];

        // sprite
        const tiles = sprites.tiles;
        const spriteAssign = Math.floor(Math.random() * tiles.length);
        let sprite = player === ''
          ? sprites.disabled
          : tiles[spriteAssign];

        if (player !== '' && landmarksAvailable.includes(id)) {
          const landmarks = sprites.landmarks;
          const landmarkAssign = Math.floor(Math.random() * landmarks.length);
          sprite = landmarks[landmarkAssign];
        }

        if (assignment.amount > 0) {
          assignment.amount--;
          hex.playerId = player;
          hex.tile = sprite;
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

export const addColors = (playerOrder, hexes) => {
  const players = ['', ...playerOrder];
  const colors = ['black', 'red', 'blue', 'yellow', 'green', 'orange'];

  if (hexes) {
    Object.keys(hexes).forEach(id => {
      const hex = document.getElementById(id)
      const text = [...hex.parentElement.childNodes][1];
      const username = hexes[id].playerId;
      const playerId = players.indexOf(username);
      text.classList.remove('hex-fill-red', 'hex-fill-black', 'hex-fill-blue', 'hex-fill-yellow', 'hex-fill-green', 'hex-fill-orange')
      text.classList.add(`hex-fill-${colors[playerId]}`);
    })
  }
}
