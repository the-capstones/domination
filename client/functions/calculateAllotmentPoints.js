import firebase from '../firebase';

const calcHexesOwned = (hexes) => {
  const players = {};
  for (let key in hexes) {
    const hexValue = hexes[key];
    const playerId = hexValue.playerId;
    if (!players[playerId]) players[playerId] = 0;
    players[playerId] += 1;
  }
  return players;
}

export const calcAllotmentPoints = (boardId, hexes) => {
  const hexesOwned = calcHexesOwned(hexes);
  const allotmentPointsPerTurn = {};
  const SMALL_BOARD_HEX_POINTS = 0.3;
  const MEDIUM_BOARD_HEX_POINTS = 0.25;
  const LARGE_BOARD_HEX_POINTS = 0.2;
  const HEXAGON_BOARD_HEX_POINTS = 0.4;
  let PER_HEX_POINTS; // = 0.0833; // 1/12 || 1 per 12 owned

  switch (Object.keys(hexes).length) {
    case 25:
      PER_HEX_POINTS = SMALL_BOARD_HEX_POINTS;
      break;

    case 48:
      PER_HEX_POINTS = MEDIUM_BOARD_HEX_POINTS;
      break;

    case 96:
      PER_HEX_POINTS = LARGE_BOARD_HEX_POINTS;
      break;

    case 37:
      PER_HEX_POINTS = HEXAGON_BOARD_HEX_POINTS;
      break;

    default:
      PER_HEX_POINTS = 0.0833; // 1/12 || 1 per 12 owned
  }
console.log(PER_HEX_POINTS)

  for (let player in hexesOwned) {
    if (!!player) {
      allotmentPointsPerTurn[player] = Math.floor(hexesOwned[player] * PER_HEX_POINTS);
    }
  }
  firebase.ref(`/boards/${boardId}/state`).update({ allotmentPointsPerTurn })
}

export const getCurrentPoints = (allotmentPointsPerTurn, username) => {
  let points;
  for (let key in allotmentPointsPerTurn) {
    if (key === username) points = allotmentPointsPerTurn[key];
  }
  points = Math.max(points, 3);
  return points;
}
