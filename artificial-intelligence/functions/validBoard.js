import { getNeighbors } from './';

const filterValidHexes = (mightBeNeighbors, cache, hexes) => {
  return mightBeNeighbors.filter(neighbor => {
    if (hexes.hasOwnProperty(neighbor) && !cache.hasOwnProperty(neighbor) && hexes[neighbor].playerId !== '') {
      cache[neighbor] = true;
      return true;
    }
    return false;
  })
};
export const validBoardCheck = (initialHex, hexes) => {
  let mightBeNeighbors;
  const queue = [];
  const cache = {};
  let index = -1;
  while (index < queue.length) {
    mightBeNeighbors = mightBeNeighbors === undefined
      ? getNeighbors(initialHex)
      : getNeighbors(queue[index]);
    queue.push(...filterValidHexes(mightBeNeighbors, cache, hexes));
    index++;
  }
  const validHexesFound = new Set(queue).size;
  const validHexesOnBoard = Object.entries(hexes).filter(hexArr => hexArr[1].playerId !== '').length;
  return validHexesFound === validHexesOnBoard;
}
