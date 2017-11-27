'use strict'
/* eslint "no-loop-func": 0 */
/* eslint "max-statements": 0 */
/* eslint "complexity": 0 */
/* eslint "guard-for-in": 0 */

const trueskill = require('trueskill')
const fs = require('fs')
const battleMatrix = require('../battleMatrix')
const { hexagons } = require('../funcs/gridGenerator')
const { divvySpaces } = require('../funcs/divvySpaces')
const { nextAllotment } = require('../allotmentFunction')
const { findPlayerStrengthQuotient } = require('../nextAttackFunction')
const { myHexes, attackMatrix } = require('../attackMatrixCreator')


const TERRITORIES_PER_UNIT_ALLOTTED = 15
const MAXIMIZE_TERRITORY_GAINS = 'maximizeTerritoryGains'
const MINIMIZE_UNITS_LOST_RATIO = 'minimizeUnitsLostRatio'


function shufflePlayerOrder(playerArray) {
  for (let i = 0; i < playerArray.length; i++) {
    let j = Math.floor(Math.random() * (playerArray.length))
    let temp = playerArray[i]
    playerArray[i] = playerArray[j]
    playerArray[j] = temp
  }
  return playerArray
}


function generateBoard(players) {
  let board = {}
  players = [...players]

  hexagons.forEach(hex => {
    hex.id = `${hex.q},${hex.r},${hex.s}`;
    board[hex.id] = {
      movesLeft: 2,
      playerId: '',
      unit1: 1
    }
  });

  divvySpaces(players, board)
  return board
}


function allot(player, board) {
  let allotStrategy = player.allotmentStrategy
  let hexToAllotTo = nextAllotment(board, player.id, allotStrategy)

  if (hexToAllotTo) {
    board[hexToAllotTo].unit1++
    console.log(`allotted unit to ${hexToAllotTo}.`)
    console.log(`units on territory: ${board[hexToAllotTo].unit1}`)
  } else {
    console.log('No valid hexes to allot to.')
  }
}


function rollDiceAndReturnMax(numDice) {
  let result = 0
  for (let i = 0; i < numDice; i++) {
    let dieRoll = Math.ceil(Math.random() * 6)
    result = dieRoll > result ? dieRoll : result
  }
  return result
}


function hasTerritories(board, playerId) {
  for (const hex in board) {
    if (board[hex].playerId === playerId) {
      return true
    }
  }
  return false
}


function battle(attackingHex, defendingHex, board) {

  let attackDiceRoll = rollDiceAndReturnMax(3)
  let defendDiceRoll = rollDiceAndReturnMax(2)
  console.log(`${attackingHex} ATTACKING ~~~~~~~~> ${defendingHex}`)
  console.log(`attacker rolled ${attackDiceRoll}`)
  console.log(`defender rolled ${defendDiceRoll}`)

  attackDiceRoll > defendDiceRoll
    ? board[defendingHex].unit1--
    : board[attackingHex].unit1--

  if (board[attackingHex].unit1 === 1) return

  if (!board[defendingHex].unit1) {

    board[defendingHex].playerId = board[attackingHex].playerId
    console.log(`${defendingHex} now belongs to attacker!`)

    let unitsToMove = board[attackingHex].unit1 - 1
    board[attackingHex].unit1 -= unitsToMove
    board[defendingHex].unit1 += unitsToMove
    return
  }

  battle(attackingHex, defendingHex, board)

}

function chooseAttack(board, player) {
  let { id,
    playerStrengthQuotientThreshold,
    attackStrategy,
    chanceToWinThreshold
  } = player
  let hexToAttack = ''
  let hexToAttackFrom = ''
  let playerAttackMatrix = attackMatrix(board, id)

  if (playerStrengthQuotientThreshold) {
    let min = playerStrengthQuotientThreshold
    for (const playableHex in playerAttackMatrix) {
      playerAttackMatrix[playableHex].forEach(attackableHex => {
        let psq = findPlayerStrengthQuotient(board, attackableHex)
        if (psq <= min) {
          min = psq
          hexToAttack = attackableHex
          hexToAttackFrom = playableHex
        }
      })
    }
  }

  if (!hexToAttack) {
    let minChanceToWin = chanceToWinThreshold
    let minLostRatio = Infinity

    for (const playableHex in playerAttackMatrix) {
      playerAttackMatrix[playableHex].forEach(attackableHex => {
        let attackUnits = board[playableHex].unit1
        let defendUnits = board[attackableHex].unit1
        let expectedUnits = battleMatrix[attackUnits][defendUnits].ExpectedUnits
        let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin
        let unitsLostRatio = (attackUnits - expectedUnits) / chanceToWin

        if (attackStrategy === MAXIMIZE_TERRITORY_GAINS && chanceToWin >= minChanceToWin) {
          minChanceToWin = chanceToWin
          hexToAttack = attackableHex
          hexToAttackFrom = playableHex
        } else if (attackStrategy === MINIMIZE_UNITS_LOST_RATIO
          && chanceToWin >= chanceToWinThreshold
          && unitsLostRatio < minLostRatio
        ) {
          minLostRatio = unitsLostRatio
          hexToAttack = attackableHex
          hexToAttackFrom = playableHex
        }
      })
    }
  }
  return [hexToAttackFrom, hexToAttack]
}


function play(player1, player2, player3, player4) {

  let board = generateBoard(arguments)
  let players = [...arguments]
  let gameRank = players.length;
  players = shufflePlayerOrder(players)

  // when gameRank gets to 1 remaning player has won the game
  while (gameRank > 1) {

    players.forEach(player => {

      // rank is assigned to players in the order that they lose,
      // so if not assigned yet they are still in the game
      if (!player.rank) {

        let { id } = player
        console.log('********************************************')
        console.log(`********** STARTING PLAYER ${id} TURN **********`)
        console.log('********************************************')

        let playerHexes = myHexes(board, id);
        let hexesOwned = Object.keys(playerHexes).length;

        // allotment phase
        let allotment = Math.max(Math.floor(hexesOwned / TERRITORIES_PER_UNIT_ALLOTTED), 3)
        console.log(`starting allotment: ${allotment} based on ${hexesOwned} territories`)

        while (allotment) {
          allot(player, board)
          allotment--
          console.log(`allotment remaining: ${allotment}`)
          console.log('--------------------------------------------')
        }

        // battle phase
        let inBattle = true
        console.log('************* BEGINNING BATTLE *************')

        while (inBattle) {
          let [hexToAttackFrom, hexToAttack] = chooseAttack(board, player)

          if (hexToAttack) {
            let defenderId = board[hexToAttack].playerId
            battle(hexToAttackFrom, hexToAttack, board)

            console.log('ATTACKED PLAYER', defenderId)
            let defenderTerritories = hasTerritories(board, defenderId)
            if (!defenderTerritories) {
              console.log(`PLAYER ${defenderId} LOST`)
              let playerLost = players.find(player => player.id === defenderId)
              playerLost.rank = gameRank;
              gameRank--
            }
          }

          if (!hexToAttack) {
            console.log('NO ADVANTAGEOUS ATTACK MOVES TO MAKE')
            inBattle = false
          }
        }

        // fortification phase

      }

    })
  }

  let playerWon = players.find(player => !player.rank)
  playerWon.rank = gameRank
  trueskill.AdjustPlayers(players)
  //each player now has accurate 'trueskill' value as player.rank
  // console.log(p1)
  // console.log(p2)
  // console.log(p3)
  // console.log(p4)
}

// dummy data for testing
let p1 = {
  id: 1,
  chanceToWinThreshold: 0.5,
  playerStrengthQuotientThreshold: 0.2,
  attackStrategy: 'maximizeTerritoryGains',
  allotmentStrategy: 'differenceInUnits',
  skill: [25, 25 / 3]
}

let p2 = {
  id: 2,
  chanceToWinThreshold: 0.6,
  playerStrengthQuotientThreshold: null,
  attackStrategy: 'maximizeTerritoryGains',
  allotmentStrategy: 'ratioOfUnits',
  skill: [25, 25 / 3]
}

let p3 = {
  id: 3,
  chanceToWinThreshold: 0.7,
  playerStrengthQuotientThreshold: null,
  attackStrategy: 'minimizeUnitsLostRatio',
  allotmentStrategy: 'ratioOfUnits',
  skill: [25, 25 / 3]
}

let p4 = {
  id: 4,
  chanceToWinThreshold: 0.4,
  playerStrengthQuotientThreshold: 9,
  attackStrategy: 'minimizeUnitsLostRatio',
  allotmentStrategy: 'differenceInUnits',
  skill: [25, 25 / 3]
}

play(p1, p2, p3, p4)

module.exports = { shufflePlayerOrder, play }
