const attackMatrixFunctions = require('./attackMatrixCreator')

// This file is responsible for creating the allotment function

// The allotment function runs at the beginning of your turn.
// Allotment is the act of allocating units across your own territories.
// This function allots units on hexes that are the most outgunned by their enemy neighbors.

// Outline:
// Step 1: Figure out what territories belong to the player.
// Step 2: For a given player territory, identify how many enemy units are in adjacent hexes
// and subtract the number of units in that territory.
// Step 3: For all territories, choose the one that has the highest value in step 2.

// Step 1: Figure out what territories belong to the player and have less than 15 units.
// (function: myHexes, imported from the attackMatrixFunctions file)

// Define some dummy data
// myPlayerId: the AI's player ID
const myPlayerId = 1
// hexesStep1: the object of hex status objects at a particular point in time
const hexesStep1 = {
    // we want to filter out this hex because the playerID doesn't match the AI
    notMyHex: {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    myHex1: {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    myHex2: {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    myHex3: {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    myHex4: {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
}

// test the function myHexes with the // console.log statement below
// it should return:
// {
// myHex1: { movesLeft: 0, playerId: 1, unit1: 6 },
// myHex2: { movesLeft: 2, playerId: 1, unit1: 1 },
// myHex3: { movesLeft: 2, playerId: 1, unit1: 6 },
// myHex4: { movesLeft: 2, playerId: 1, unit1: 6 }
// }
// // console.log(attackMatrixFunctions.myHexes(hexesStep1, myPlayerId))

// Step 2: For a given player territory, identify how many enemy units are in adjacent hexes
// and subtract the number of units in that territory.
// (function: unitStrengthDifference)

// hexesStep2: the object of hex status objects at a particular point in time
const hexesStep2 = {
    // we want to return this hexes
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '0,-1,1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 10,
    },
}

function unitStrengthDifference(allHexesObj, startingHex, artIntelplayerId, measurementType){
    const adjacentHexResults = attackMatrixFunctions.adjacentHex(startingHex)
    const nearbyEnemyUnits = adjacentHexResults.map(hex => {
        if (allHexesObj[hex] &&
            allHexesObj[hex].playerId !== '' &&
            allHexesObj[hex].playerId !== artIntelplayerId) {
            return allHexesObj[hex].unit1
        } else {return 0}
        }).reduce((sum, value) => {return sum + value}, 0)
    const myUnits = allHexesObj[startingHex].unit1
    let difference = measurementType === 'differenceInUnits'
        ? nearbyEnemyUnits - myUnits
        : nearbyEnemyUnits / myUnits
    return difference
}

// test the function unitStrengthDifference with the // console.log statement below
// it should return 4
// // console.log(unitStrengthDifference(hexesStep2, '0,0,0'))

// Step 3: For all territories, filter the ones out that have 15 units and choose
// the one that has the highest value in step 2.
// (function: nextAllotment)

const hexesStep3 = {
    // we want to return this hexes
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    '0,-1,1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 2,
    },
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    '4,5,6': {
        movesLeft: 2,
        playerId: 2,
        unit1: 15,
    },
}

function nextAllotment(allHexesObj, artIntelplayerId, measurementType){
    // const start = process.memoryUsage().heapUsed / 1024 / 1024;
    const myHexesResults = attackMatrixFunctions.myHexes(allHexesObj, artIntelplayerId)
    let allotableHexes = []
    for (const hex in myHexesResults) {
        if (allHexesObj[hex].unit1 < 15) {allotableHexes.push(hex)}
    }
    let biggestUnitDifference = -Infinity
    let mostNeededAllotment = ''
    allotableHexes.forEach(hex => {
        let difference = unitStrengthDifference(allHexesObj, hex, artIntelplayerId, measurementType)
        if (difference > biggestUnitDifference) {
            biggestUnitDifference = difference
            mostNeededAllotment = hex
        }
    })
    // const end = (process.memoryUsage().heapUsed / 1024 / 1024) - start
    // console.log(`The nextAllotment() script uses approximately ${end} MB`);
    // const used = process.memoryUsage().heapUsed / 1024 / 1024;
    // console.log(`The entire process is currently using approximately ${used} MB`);
    return mostNeededAllotment
}

// test the function nextAllotment with the // console.log statement below
// it should return '5,5,5'
// console.log(nextAllotment(hexesStep3, myPlayerId, 'differenceInUnits'))

module.exports = {
    unitStrengthDifference,
    nextAllotment
}
