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

const landmarksOwned = (hexes) => {
  const playersLandmarks = {};
  const landmarks = [
    'medieval_archery',
    'medieval_archway',
    'medieval_blacksmith',
    'medieval_cabin',
    'medieval_church',
    'medieval_farm',
    'medieval_house',
    'medieval_largeCastle',
    'medieval_lumber',
    'medieval_mine',
    'medieval_openCastle',
    'medieval_ruins',
    'medieval_smallCastle',
    'medieval_tower',
    'medieval_windmill'
  ];

  for (let key in hexes) {
    const hexValue = hexes[key];
    const playerId = hexValue.playerId;
    const tileType = hexValue.tile;

    if (landmarks.indexOf(tileType) !== -1) {
      if (!playersLandmarks[playerId]) playersLandmarks[playerId] = 0;
      playersLandmarks[playerId] += 1;
    }
  }

  return playersLandmarks;
}

export const calcAllotmentPoints = (boardId, hexes, allotmentRate = 3, landmarkValue = 0) => {
  const playerLandmarks = landmarksOwned(hexes)
  const hexesOwned = calcHexesOwned(hexes);
  const allotmentPointsPerTurn = {};
  const ALLOTMENT_RATE = 1 / allotmentRate;

  for (let player in hexesOwned) {
    if (!!player) {
      allotmentPointsPerTurn[player] = Math.floor(hexesOwned[player] * ALLOTMENT_RATE) + (playerLandmarks[player] * landmarkValue);
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
