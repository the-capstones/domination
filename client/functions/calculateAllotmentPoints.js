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

export const addUnit = (boardId, id, hexagons, allotmentLeft) => {
  if (allotmentLeft > 0) {
    allotmentLeft -= 1;
    const updatedHexArr = Object.entries(hexagons).filter(hex => hex[0] === id );
    const hexId = updatedHexArr[0][0];
    const hexStats = updatedHexArr[0][1];
    const updatedHexObj = {
      [hexId]: Object.assign({}, hexStats),
    };
    updatedHexObj[hexId].unit1 += 1;
    firebase.ref(`/boards/${boardId}/hexes`).update(updatedHexObj);
    firebase.ref(`/boards/${boardId}/state`).update({ allotmentLeft });
    if (allotmentLeft === 0) {
      firebase.ref(`/boards/${boardId}/state`).update({ currentPhase: 'attack' });
    }
  }
  else {
    firebase.ref(`/boards/${boardId}/state`).update({ currentPhase: 'attack' });
  }
}
