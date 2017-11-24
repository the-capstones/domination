const getNeighbor = (id, [q, r, s]) => {
  const sepId = id.split(',').map(coord => +coord);
  sepId[0] += q;
  sepId[1] += r;
  sepId[2] += s;
  return sepId.join(',');
}

const getNeighbors = (id) => {
  const directions = [
    [1, 0, -1], [1, -1, 0], [0, -1, 1],
    [-1, 0, 1], [-1, 1, 0], [0, 1, -1]
  ];
  return directions.map(direction => getNeighbor(id, direction))
}


module.exports = {
  getNeighbors
}
