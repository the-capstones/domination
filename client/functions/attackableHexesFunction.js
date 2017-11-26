function myHexes(hexesObj, artIntelplayerId) {
    let hexResults = {}
    for (const hexTile in hexesObj){
      if (hexesObj[hexTile].playerId === artIntelplayerId){
          hexResults[hexTile] = hexesObj[hexTile]
      }
    }
    return hexResults
}

function hasMoves(hexesObj) {
    let hexResults = {}
    for (const hexTile in hexesObj){
      if (hexesObj[hexTile].movesLeft > 0){
          hexResults[hexTile] = hexesObj[hexTile]
      }
    }
    return hexResults
}

function enoughUnits(hexesObj) {
    let hexResults = {}
    for (const hexTile in hexesObj){
      if (hexesObj[hexTile].unit1 > 1){
          hexResults[hexTile] = hexesObj[hexTile]
      }
    }
    return hexResults
}

function playableHexes(hexesObj, artIntelplayerId){
    let myHexesResults = myHexes(hexesObj, artIntelplayerId)
    let hasMovesResults = hasMoves(myHexesResults)
    let enoughUnitsResults = enoughUnits(hasMovesResults)
    return enoughUnitsResults
}

function adjacentHex(startingHexString){
    const startingHexArray = [startingHexString.split(',').map(numString => +numString)]
    const nestedResults = startingHexArray.map(starting => (
        [[starting[0] - 1, starting[1] + 1, starting[2]],
        [starting[0] - 1, starting[1], starting[2] + 1],
        [starting[0], starting[1] - 1, starting[2] + 1],
        [starting[0], starting[1] + 1, starting[2] - 1],
        [starting[0] + 1, starting[1], starting[2] - 1],
        [starting[0] + 1, starting[1] - 1, starting[2]]]
    ))
    const adjacentHexes = nestedResults[0].map(hex => hex.join(','))
    return adjacentHexes
}

function isAHexNotMyHex(allHexesObj, adjacentHexArray, artIntelplayerId){
  let results = []
  adjacentHexArray.forEach(hex => {
    if (allHexesObj[hex] && allHexesObj[hex].playerId !== '' && allHexesObj[hex].playerId !== artIntelplayerId){
        results.push(hex)
    }
  })
  return results
}

function attackableHexes(allHexesObj, startingHexString, artIntelplayerId){
    const adjacentHexes = adjacentHex(startingHexString)
    const attackableHexArr = isAHexNotMyHex(allHexesObj, adjacentHexes, artIntelplayerId)
    return attackableHexArr
}

export function attackMatrix(hexesObj, artIntelplayerId){
  let attackMoveObj = {}
  const playableHexesResults = playableHexes(hexesObj, artIntelplayerId)
  for (const startingHex in playableHexesResults){
    attackMoveObj[startingHex] = attackableHexes(hexesObj, startingHex, artIntelplayerId)
  }
  return attackMoveObj
}