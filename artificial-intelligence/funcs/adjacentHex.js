function adjacentHex(startingHexString, allHexesObj) {
  const startingHexArray = [startingHexString.split(',').map(numString => +numString)]
  const nestedResults = startingHexArray.map(starting => (
      [[starting[0] - 1, starting[1] + 1, starting[2]],
      [starting[0] - 1, starting[1], starting[2] + 1],
      [starting[0], starting[1] - 1, starting[2] + 1],
      [starting[0], starting[1] + 1, starting[2] - 1],
      [starting[0] + 1, starting[1], starting[2] - 1],
      [starting[0] + 1, starting[1] - 1, starting[2]]]
  ))
  const adjacentHexes = nestedResults[0]
      .map(hex => hex.join(','))
      .filter(hexId => !!allHexesObj[hexId])
  return adjacentHexes
}

module.exports = { adjacentHex }
