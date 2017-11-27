const getNeighbor = (id, [q, r, s]) => {
  const sepId = id.split(',').map(coord => +coord);
  sepId[0] += q;
  sepId[1] += r;
  sepId[2] += s;
  return sepId.join(',');
}

export const getNeighbors = (id) => {
  const directions = [
    [1, 0, -1], [1, -1, 0], [0, -1, 1],
    [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
  ];
  return directions.map(direction => getNeighbor(id, direction))
}

export const highlightNeighbors = (id, currentPlayer, hexes) => {
  if (hexes[id].playerId !== currentPlayer || hexes[id].unit1 <= 1 ) return;
  const enemyNeighbors = getNeighbors(id)
    .filter(neighborId => {
      return hexes[neighborId]
        && hexes[neighborId].playerId !== currentPlayer
        && hexes[neighborId].playerId !== ''
    })
    .map(neighborId => document.getElementById(neighborId));

    enemyNeighbors.forEach(hex => hex && hex.classList.add('highlight-attack'));
}

export const highlightMovableNeighbors = (id, currentPlayer, hexes) => {
  if (hexes[id].playerId !== currentPlayer || hexes[id].unit1 <= 1 ) return;
  const friendlyNeighbors = getNeighbors(id)
    .filter(neighborId => {
      return hexes[neighborId]
        && hexes[neighborId].playerId === currentPlayer
        && hexes[neighborId].unit1 < 15
    })
    .map(neighborId => document.getElementById(neighborId));

    friendlyNeighbors.forEach(hex => hex && hex.classList.add('highlight-move'));
}

export const removeAllHighlights = () =>
{
  const highlightedHexes = [...document.getElementsByClassName('highlight-select')];
  highlightedHexes.forEach(hex => hex.classList.remove('highlight-select'));
  const highlightedHexes1 = [...document.getElementsByClassName('highlight-attack')];
  highlightedHexes1.forEach(hex => hex.classList.remove('highlight-attack'));
  const highlightedHexes2 = [...document.getElementsByClassName('highlight-move')];
  highlightedHexes2.forEach(hex => hex.classList.remove('highlight-move'));
}
