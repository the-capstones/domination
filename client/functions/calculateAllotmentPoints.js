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

export const calcAllotmentPoints = (boardId, hexes, allotmentRate = 3) => {
  console.log('calcAllotmentPoints args', arguments)
  const hexesOwned = calcHexesOwned(hexes);
  const allotmentPointsPerTurn = {};
  const ALLOTMENT_RATE = 1 / allotmentRate;

  for (let player in hexesOwned) {
    if (!!player) {
      allotmentPointsPerTurn[player] = Math.floor(hexesOwned[player] * ALLOTMENT_RATE);
    }
  }
  firebase.ref(`/boards/${boardId}/state`).update({ allotmentPointsPerTurn })
}

export const getCurrentPoints = (allotmentPointsPerTurn, username) => {
  console.log('getCurrentPoints', arguments)
  let points;
  for (let key in allotmentPointsPerTurn) {
    if (key === username) points = allotmentPointsPerTurn[key];
  }
  points = Math.max(points, 3);
  return points;
}
