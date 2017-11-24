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
  const PER_HEX_POINTS = 0.0833; // 1/15 || 1 per 15 owned

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
