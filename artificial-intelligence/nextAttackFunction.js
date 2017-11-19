const battleMatrix = require('./battleMatrix')
const attackMatrix = require('./attackMatrixCreator')

// This file is responsible for creating the nextAttack function

// The bestAttack function calculates the next attack move from a given board
// and returns the move only if the expected probability of winning is greater
// than a pre-defined threshold percentage.

// Outline:
// Step 1: Create a function that returns the expected probability of winning
// an attack from a given starting hex and a given adjacent attack hex.
// Step 2: Create a function that returns the next best attack out of all possible attacks.

// Step 1: Create a function that returns the expected probability of winning
// an attack from a given starting hex, a given adjacent attack hex, and the battle matrix.
// (function: winProbability)

// Define some dummy data
// myPlayerId: The AI's player ID.
const myPlayerId = 1
// minThresholdToAttack: The AI's minimum chance to win a territory to execute an attack.
// Attack probabilities below this threshold will not be made.
const minThresholdToAttack = .50
// hexesStep1: The object of hex status objects at a particular point in time.
const hexesStep1 = {
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    '0,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 3,
    },
}
// this is our hex that we will be attacking from
const attackStartHex = '0,0,0'
// this is the enemy hex that we will be attacking
const attackEndHex = '0,0,1'

function winProbability(allHexesObj, battleMatrix, myHex, enemyHex){
    const attackerUnits = allHexesObj[myHex].unit1
    const defenderUnits = allHexesObj[enemyHex].unit1
    const winningProbability = battleMatrix[attackerUnits][defenderUnits].ChanceToWin
    return winningProbability
}

// test the function winProbability with the console.log statements below
// console.log(battleMatrix[6][3].ChanceToWin)
// console.log(winProbability(hexesStep1, battleMatrix, attackStartHex, attackEndHex))

// Step 2: Create a function that returns the best possible attack out of all possible attacks.
// (function: bestAttack)

const hexesStep2 = {
    // this is our starting attack hex
    '0,0,0': {
        movesLeft: 2,
        playerId: 1,
        unit1: 6,
    },
    // this is our second starting attack hex
    '5,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 10,
    },
    // we want to filter out this hex because the hex isn't adjacent
    '-20,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 6,
    },
    // we want to filter out this hex because the hex isn't valid
    '-1,0,0': {
        movesLeft: 0,
        playerId: null,
        unit1: 0,
    },
    // we want to return these 4 hexes
    '0,-1,0': {
        movesLeft: 0,
        playerId: 2,
        unit1: 7,
    },
    '0,1,0': {
        movesLeft: 0,
        playerId: 2,
        unit1: 8,
    },
    '0,0,-1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 9,
    },
    // this is the attack hex we want our function to return
    '0,0,1': {
        movesLeft: 0,
        playerId: 2,
        unit1: 1,
    },
    // we want to filter out this hex because the hex isn't valid for the second of our territories
    '4,5,5': {
        movesLeft: 0,
        playerId: null,
        unit1: 6,
    },
    // we want to filter out this hex because the hex doesn't have enough units
    '6,5,5': {
        movesLeft: 2,
        playerId: 1,
        unit1: 1,
    },
    // we want to filter out this hex because the hex doesn't have enough moves
    '5,4,5': {
        movesLeft: 0,
        playerId: 1,
        unit1: 6,
    },
    // the following three territories are attackable, but not the best attacks
    '5,6,5': {
        movesLeft: 0,
        playerId: 2,
        unit1: 10,
    },
    '5,5,4': {
        movesLeft: 0,
        playerId: 2,
        unit1: 10,
    },
    '5,5,6': {
        movesLeft: 0,
        playerId: 2,
        unit1: 10,
    },
}

// attackMatrix requires hexesObj, artIntelplayerId
// winProbability requires allHexesObj, battleMatrix, myHex, enemyHex
function bestAttack(allHexesObj, artIntelplayerId, battleMatrix, minThresholdToAttack){
  const currentAttackMatrix = attackMatrix(allHexesObj, artIntelplayerId)
  let bestWinProbability = minThresholdToAttack
  let nextAttack = []
  for (const myHex in currentAttackMatrix){
      currentAttackMatrix[myHex].forEach(enemyHex => {
          const winChance = winProbability(allHexesObj, battleMatrix, myHex, enemyHex)
          if (winChance >= bestWinProbability){
              bestWinProbability = winChance;
              nextAttack = [myHex,enemyHex, winChance]
          }
      })
  }
  if (nextAttack.length === 0) nextAttack = null
  return nextAttack
}

// test the function bestAttack with the console.log statements below
// it should return the attack ['0,0,0','0,0,1', 0.975171057034073] if the
// minimum threshold defined at the top of this document is less than that 0.97 probability
// console.log(minThresholdToAttack, 'minThresholdToAttack')
// console.log(battleMatrix[6][1].ChanceToWin, 'best attack probability on the board')
// console.log(bestAttack(hexesStep2, myPlayerId, battleMatrix, minThresholdToAttack), 'next attack')

module.exports = bestAttack
