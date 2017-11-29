/* eslint "guard-for-in": 0 */
const attackMatrixFunctions = require('./attackMatrixCreator')
// const adjacentHex = require('./funcs/adjacentHex')

// QUESTION
// Suggestions for optimizing? When running simulation, frequently gets stuck on fortification phase. Is there a better way to do this?


// REFACTOR CLOSEST ENEMY FUNCTION TO CACHE THE ALREADY SEARCHED HEXES
// This file is responsible for creating the fortify function

// The fortify function runs after the nextAttack function has exhausted all worthwhile attacks.
// Fortification is the act of moving units from one territory you own to another that you own
// in order to strengthen your army at another territory. You only get to fortify once per round
// at the end of your turn. This function chooses the best move for fortification.

// Outline:
// Step 1: Figure out what territories belong to the player, which of those can move,
// and to what hexes they can move to.
// Step 2: For a given player territory, identify where the closest enemy is.
// Step 3: Calculate the product of the units in a territory that can move times
// the distance to the closest enemy.
// Step 4: Identify all the valid moves territory could make and the resulting difference from the
// product in step 3 and the current product. (oldProduct - newProduct)
// Step 5: For all territories with valid moves, choose the one that has the highest value in step 4.

// Step 1: Figure out what territories belong to the player and can move.
// (function: movableHexes)

// Define some dummy data
// myPlayerId: The AI's player ID.
const myPlayerId = 1
// hexesStep1: the object of hex status objects at a particular point in time
const hexesStep1 = {
    // we want to filter out this hex because the playerID doesn't match the AI
    notMyHex: {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex has no more moves left
    noMoves: {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    // we want to filter out this hex because it doesn't have enough units to do anything
    notEnoughUnits: {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    // we want to filter out this hex because it has an enemy next to it
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '0,-1,1': {
        movesLeft: 2,
        playerId: 2,
        unit1: 6,
    },
    // we want to return this '5,5,5' hex
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // we want to return this '5,6,4' hex
    '5,6,4': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    '5,4,6': {
        movesLeft: 0,
        playerId: 1,
        unit1: 15,
    },
    '5,8,2': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
}

function movableHexes(allHexesObj, artIntelplayerId) {
    // console.time("movableHexes")
    let movableHexObj = {}
    const myHexesResults = attackMatrixFunctions.myHexes(allHexesObj, artIntelplayerId)
    const enoughUnitsResults = attackMatrixFunctions.enoughUnits(myHexesResults)
    for (hexString in enoughUnitsResults) {
        const adjacentHexResults = attackMatrixFunctions.adjacentHex(hexString)
        let enemiesNear = 0
        let movableHexArray = []
        adjacentHexResults.forEach(hex => {
            // if this hex exists, and is valid, and has less than 15 units, continue
            if (allHexesObj[hex] && allHexesObj[hex].playerId !== '' && allHexesObj[hex].unit1 < 15) {
                // if there is an enemy adjacent to this hex, increment enemiesNear
                if (allHexesObj[hex].playerId !== artIntelplayerId) {
                    enemiesNear++
                }
                // if there aren't any enemies adjacent to this hex, add it to the list of movable Hexes
                if (enemiesNear === 0) { movableHexArray.push(hex) }
            }
        })
        if (enemiesNear === 0 && movableHexArray.length > 0) movableHexObj[hexString] = movableHexArray
    }
    if (Object.keys(movableHexObj).length === 0) { return null }
    // console.timeEnd("movableHexes")
    return movableHexObj
}

// test the function movableHexes with the // console.log statements below
// it should return:
// { '5,5,5': [ '5,6,4' ],
//   '5,6,4': [ '5,5,5' ],
//   '5,4,6': [ '5,5,5' ] }
// // console.log(movableHexes(hexesStep1, myPlayerId))

// Step 2: For a given player territory, identify where the closest enemy is.
// (function: closestEnemy)

const hexesStep2 = {
    // this is our starting hex
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // we want to filter out this hex because it is an invalid hex
    '0,1,-1': {
        movesLeft: 0,
        playerId: '',
        unit1: 6,
    },
    // we want to return this hex
    '0,2,-2': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    }
}


// function closestEnemy(allHexesObj, startingHex, artIntelplayerId) {
//     let queue = adjacentHex(startingHex, allHexesObj)
//     let closestEnemyHex = null
//     let searchedHexes = {}
//     let totalEnemyHexes = Object.keys(allHexesObj).filter(hexID => {
//         return allHexesObj[hexID].playerId !== '' && allHexesObj[hexID].playerId !== artIntelplayerId
//     })
//     let maxHexesToSearch = Object.keys(allHexesObj).length - totalEnemyHexes.length

//     while (Object.keys(searchedHexes).length <= maxHexesToSearch && !closestEnemyHex) {
//         let hex = queue.shift()
//         if (!searchedHexes.hasOwnProperty(hex)) {
//             if (allHexesObj[hex] &&
//                 allHexesObj[hex].playerId !== '' &&
//                 allHexesObj[hex].playerId !== artIntelplayerId) {
//                 closestEnemyHex = hex
//             } else {
//                 searchedHexes[hex] = hex
//                 queue = queue.concat(adjacentHex(hex, allHexesObj))
//             }
//         }
//     }
//     return closestEnemyHex
// }

function closestEnemy(allHexesObj, startingHex, artIntelplayerId) {
    // console.time("closest enemy")
    // // console.log('starting closestEnemy')
    let totalEnemyHexes = Object.keys(allHexesObj).filter(hexID => {
        return allHexesObj[hexID].playerId !== '' && allHexesObj[hexID].playerId !== artIntelplayerId
    })
    // // console.log('totalEnemyHexes', totalEnemyHexes.length)
    let closestDistance = Infinity
    let closestEnemyHex = null
    totalEnemyHexes.forEach(enemyHexId => {
        const enemyDistance = hexDistance(startingHex, enemyHexId)
        if (enemyDistance < closestDistance) {
            closestDistance = enemyDistance
            closestEnemyHex = enemyHexId
        }
    })
    // console.timeEnd("closest enemy")
    // // console.log('ending closestEnemy')
    return closestEnemyHex
}

// test the function closestEnemy with the // console.log statement below
// it should return '0,2,-2'
// // console.log('CLOSEST ENEMY HEX:', closestEnemy(hexesStep2, '0,0,0', myPlayerId))

// Step 3: Calculate the product of the units in a territory that can move times
// the distance to the closest enemy.
// (container function: unitUselessnessProduct)
// --Calculate the distance between two hexes
// (function: hexDistance)

const hexesStep3 = {
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '5,8,2': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
}

function hexDistance(startingHex, endingHex) {
    // console.time("hex distance")
    const startingHexArray = startingHex.split(',').map(numString => +numString)
    const endingHexArray = endingHex.split(',').map(numString => +numString)
    const qDiff = Math.abs(startingHexArray[0] - endingHexArray[0])
    const rDiff = Math.abs(startingHexArray[1] - endingHexArray[1])
    const sDiff = Math.abs(startingHexArray[2] - endingHexArray[2])
    // console.timeEnd("hex distance")
    return Math.max(qDiff, rDiff, sDiff)
}
// test the function hexDistance with the // console.log statement below
// it should return the number 2
// // console.log(hexDistance('0,0,0', '0,2,-2'))


// closestEnemy requires allHexesObj, startingHex, artIntelplayerId
// hexDistance requires startingHex, endingHex
function unitUselessnessProduct(allHexesObj, startingHex, artIntelplayerId) {
    // console.time("UUP")
    const closestEnemyResult = closestEnemy(allHexesObj, startingHex, artIntelplayerId)
    if (closestEnemyResult === null) { return null }
    const hexDistanceResult = hexDistance(startingHex, closestEnemyResult)
    const unitsWhoCanMove = allHexesObj[startingHex].unit1 - 1
    // console.timeEnd("UUP")
    return unitsWhoCanMove * hexDistanceResult
}

// test the function unitUselessnessProduct with the // console.log statement below
// it should return the number 15
// // console.log(unitUselessnessProduct(hexesStep3, '5,5,5', myPlayerId))

// Step 4: Identify all the valid moves territory could make and the resulting difference from the
// product in step 3 and the current product. (oldProduct - newProduct)
// (container function: biggestChangeInProduct)

const hexesStep4 = {
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '5,6,4': {
        movesLeft: 0,
        playerId: 1,
        unit1: 1,
    },
    '5,4,6': {
        movesLeft: 0,
        playerId: 1,
        unit1: 15,
    },
    '6,4,5': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    '5,8,2': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
}

const hexToMove = '5,5,5'
const hexesToMoveTo = ['5,6,4', '6,4,5']

// unitUselessnessProduct requires allHexesObj, startingHex, artIntelplayerId
// hexDistance requires startingHex, endingHex
function biggestChangeInProduct(allHexesObj, startingHex, moveArray, artIntelplayerId) {
    // console.time("biggest change in product")
    const startingProduct = unitUselessnessProduct(allHexesObj, startingHex, artIntelplayerId)
    if (startingProduct === null) { return null }
    let changeInProduct = 0
    let bestHexToMoveTo = ''
    moveArray.forEach(endHex => {
        const maxUnitsToFit = 15 - allHexesObj[endHex].unit1
        const maxUnitsToMoveStart = allHexesObj[startingHex].unit1 - 1
        if (maxUnitsToMoveStart < maxUnitsToFit) {
            const closestEnemyResult = closestEnemy(allHexesObj, endHex, artIntelplayerId)
            const hexDistanceResult = hexDistance(endHex, closestEnemyResult)
            const unitsWhoCanMove = maxUnitsToMoveStart
            newProduct = unitsWhoCanMove * hexDistanceResult
            newChangeInProduct = startingProduct - newProduct
            if (newChangeInProduct > changeInProduct) {
                changeInProduct = newChangeInProduct
                bestHexToMoveTo = endHex
            }
        }
        if (maxUnitsToMoveStart > maxUnitsToFit) {
            const closestEnemyResult1 = closestEnemy(allHexesObj, endHex, artIntelplayerId)
            const hexDistanceResult1 = hexDistance(endHex, closestEnemyResult1)
            const closestEnemyResult2 = closestEnemy(allHexesObj, startingHex, artIntelplayerId)
            const hexDistanceResult2 = hexDistance(startingHex, closestEnemyResult2)
            const unitsWhoCanMove = maxUnitsToFit
            newProduct = unitsWhoCanMove * hexDistanceResult1 + (maxUnitsToMoveStart - maxUnitsToFit) * hexDistanceResult2
            newChangeInProduct = startingProduct - newProduct
            if (newChangeInProduct > changeInProduct) {
                changeInProduct = newChangeInProduct
                bestHexToMoveTo = endHex
            }
        }
    }
    )
    // console.timeEnd("biggest change in product")
    return [bestHexToMoveTo, changeInProduct]
}

// test the function biggestChangeInProduct with the // console.log statement below
// it should return [ '5,6,4', 5 ]
// // console.log(biggestChangeInProduct(hexesStep4, hexToMove, hexesToMoveTo, myPlayerId))

// Step 5: For all territories with valid moves, choose the one that has the highest value in step 4.
// (function: bestMove)

const hexesStep5 = {
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '5,6,4': {
        movesLeft: 0,
        playerId: 1,
        unit1: 1,
    },
    '5,4,6': {
        movesLeft: 0,
        playerId: 1,
        unit1: 15,
    },
    '6,4,5': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    '5,8,2': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
}

function bestMove(allHexesObj, artIntelplayerId) {
    // console.time('best move')
    const movableHexesResults = movableHexes(allHexesObj, artIntelplayerId)
    if (movableHexesResults === null) { return null }
    let currentBestMove = ['', '', 0]
    for (const startHex in movableHexesResults) {
        const bestMoveForThisHex = biggestChangeInProduct(allHexesObj, startHex, movableHexesResults[startHex], artIntelplayerId)
        if (bestMoveForThisHex === null) { continue }
        if (bestMoveForThisHex[1] > currentBestMove[2]) {
            currentBestMove = [startHex, ...bestMoveForThisHex]
        }
    }
    if (currentBestMove[2] === 0) { return null }
    // console.timeEnd('best move')
    return currentBestMove
}

// // console.log(movableHexes(hexesStep5, myPlayerId))

// // console.log(biggestChangeInProduct(hexesStep5, hexToMove, hexesToMoveTo, myPlayerId))

// best move looks like:
// [ fromHexId, toHexId, product]
// test the function bestMove with the // console.log statement below
// it should return [ '5,4,6', '5,5,5', 14 ]
// // console.log(bestMove(hexesStep5, myPlayerId))

module.exports = { hexDistance, bestMove }
