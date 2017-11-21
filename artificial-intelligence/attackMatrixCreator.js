
// This file is responsible for creating the attack Matrix

// The attack matrix is an object that calculates all the possible attacks
// that a player can make given a starting board state.

// Outline:
// Step 1: Figure out what territories belong to the player and can attack.
// Step 2: For a given player territory, identify what hexes can they attack.
// Step 3: Create an attack matrix with all the possible attacks a player can make.

// Step 1: Filter out any hexes               (container Function: playableHexes)
// --that don't belong to the AI,             (function: myHexes)
// --that have no moves left, or              (function: hasMoves)
// --don't have enough units to do anything.  (function: enoughUnits)

// Define some dummy data
// myPlayerId: the AI's player ID
const myPlayerId = 1
// hexesStep1: the object of hex status objects at a particular point in time
const hexesStep1 = {
    // we want to filter out this hex because the playerID doesn't match the AI
    'notMyHex': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex has no more moves left
    'noMoves': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    // we want to filter out this hex because it doesn't have enough units to do anything
    'notEnoughUnits': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    // we want to return this hexes
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '0,-1,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
}


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

// test the function playableHexes with the console.log statements below
// console.log(hexesStep1)
// console.log(playableHexes(hexesStep1, myPlayerId))

// Step 2: For a given hex, which hexes can I attack?          (container Function: attackableHexes)
// --adjacent hexes,                                           (function: adjacentHex)
// --hex exists and is valid and isn't my hex                  (function: isAHexNotMyHex)

// Define some dummy data
// myPlayerId: the AI's player ID, defined in step 1
const startingHex = '0,0,0'
// hexesStep2: the object of hex status objects at a particular point in time
const hexesStep2 = {
    // this is our starting hex
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't adjacent
    '-20,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't valid
    '-1,0,1': {
        movesLeft: 0,
        playerId: '',
        unit1: 6,
    },
    // we want to filter out this hex because it belongs to the AI
    '-1,1,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    // we want to return these 4 hexes
    '1,-1,0': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    '1,0,-1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    '0,1,-1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    '0,-1,1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
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

const adjacentHexResults = adjacentHex(startingHex)

function isAHexNotMyHex(allHexesObj, adjacentHexArray, artIntelplayerId){
  let results = []
  adjacentHexArray.forEach(hex => {
    if (allHexesObj[hex] && allHexesObj[hex].playerId !== '' && allHexesObj[hex].playerId !== artIntelplayerId){
        results.push(hex)
    }
  })
  return results
}

isAHexNotMyHex(hexesStep2, adjacentHexResults, myPlayerId)

function attackableHexes(allHexesObj, startingHexString, artIntelplayerId){
    const adjacentHexes = adjacentHex(startingHexString)
    const attackableHexArr = isAHexNotMyHex(allHexesObj, adjacentHexes, artIntelplayerId)
    return attackableHexArr
}

// test the function attackableHexes with the console.log statements below
// console.log(startingHex, 'dummy starting hex')
// console.log(attackableHexes(hexesStep2, startingHex, myPlayerId), 'final results!')

// Step 3: For a given board, what are all the attacks I can make?
// (container Function: attackMatrix)
// --Step 1: What are my playable hexes?                       (function: playableHexes from Step 1)
// --Step 2: What attacks can I make with those hexes?         (function: attackableHexes from Step 2)

// Define some dummy data
// myPlayerId: the AI's player ID, defined in step 1
// hexesStep2: the object of hex status objects at a particular point in time
const hexesStep3 = {
    // this is one of our starting hexes
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // this is second of our starting hexes
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't adjacent
    '-20,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't valid
    '-1,1,0': {
        movesLeft: 0,
        playerId: '',
        unit1: 6,
    },
    // we want to return these 4 hexes for the first of our territories
    '-1,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    '0,-1,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    '0,1,-1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    '1,0,-1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't valid for the second of our territories
    '4,5,6': {
        movesLeft: 0,
        playerId: '',
        unit1: 6,
    },
    // we want to filter out this hex because the hex doesn't have enough units
    '4,6,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    // we want to filter out this hex because the hex doesn't have enough moves
    '5,4,6': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    // we want to return the follow 3 territories for our second hex
    '5,6,4': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    '6,5,4': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    '6,4,5': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
}

// hexesObj, artIntelplayerId required for playableHexes
// allHexesObj, startingHexString, artIntelplayerId required for attackableHexes
function attackMatrix(hexesObj, artIntelplayerId){
  let attackMoveObj = {}
  const playableHexesResults = playableHexes(hexesObj, artIntelplayerId)
  for (const startingHex in playableHexesResults){
    attackMoveObj[startingHex] = attackableHexes(hexesObj, startingHex, artIntelplayerId)
  }
  return attackMoveObj
}

// test the function attackMatrix with the console.log statements below
// console.log('----------------');
// console.log('----------------');
// console.log('starting board state')
// console.log(hexesStep3)
// console.log('----------------');
// console.log('----------------');
// console.log('starting playerId for the artificial intelligence', myPlayerId)
// console.log(attackMatrix(hexesStep3, myPlayerId))

module.exports = {
    attackMatrix,
    myHexes,
    enoughUnits,
    adjacentHex
}
