'use strict'
/* eslint "no-loop-func": 0 */
/* eslint "max-statements": 0 */
/* eslint "complexity": 0 */
/* eslint "guard-for-in": 0 */

const trueskill = require('trueskill')
const { hexagons } = require('../funcs/gridGenerator')
const { divvySpaces } = require('../funcs/divvySpaces')
const { nextAllotment } = require('../allotmentFunction')
const battleMatrix = require('../battleMatrix')
const { findPlayerStrengthQuotient, findAllEnemyHexesOnBoard, bestAttack } = require('../nextAttackFunction')
const { myHexes, attackMatrix } = require('../attackMatrixCreator')

const TERRITORIES_PER_UNIT_ALLOTTED = 15
const MAXIMIZE_TERRITORY_GAINS = 'maximizeTerritoryGains'
const MINIMIZE_UNITS_LOST_RATIO = 'minimizeUnitsLostRatio'
const DIFFERENCE_IN_UNITS = 'differenceInUnits'
const RATIO_OF_UNITS = 'ratioOfUnits'


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
  let results = []
  for (let i = 0; i < numDice; i++) {
    results.push(Math.ceil(Math.random() * 6))
  }
  return results.reduce((sum, currDice) => Math.max(sum, currDice))
}


function attack(attackingHex, defendingHex, board) {

  let attackDiceRoll = rollDiceAndReturnMax(3)
  let defendDiceRoll = rollDiceAndReturnMax(2)
  console.log(`${attackingHex} ATTACKING ~~~~~~~~> ${defendingHex}`)
  console.log(`attacker rolled ${attackDiceRoll}`)
  console.log(`defender rolled ${defendDiceRoll}`)

  attackDiceRoll > defendDiceRoll
    ? board[defendingHex].unit1--
    : board[attackingHex].unit1--

  if (board[attackingHex].unit1 === 1) {
    return
  }

  if (!board[defendingHex].unit1) {
    board[defendingHex].playerId = board[attackingHex].playerId
    console.log(`${defendingHex} now belongs to attacker!`)

    let unitsToMove = board[attackingHex].unit1 - 1
    board[attackingHex].unit1 -= unitsToMove
    board[defendingHex].unit1 += unitsToMove
    return
  }

  attack(attackingHex, defendingHex, board)

}


function play(player1, player2, player3, player4) {
  // initialize board
  let board = generateBoard(arguments)

  let players = [...arguments]
  let gameRank = players.length;
  players = shufflePlayerOrder(players)

  // when gameRank gets to 0 game is over
  while (gameRank) {

    players.forEach(player => {

      let {
        chanceToWinThreshold,
        playerStrengthQuotientThreshold,
        attackStrategy,
        id
      } = player

      console.log('********************************************')
      console.log(`********** STARTING PLAYER ${id} TURN **********`)
      console.log('********************************************')
      let playerHexes = myHexes(board, id);
      let hexesOwned = Object.keys(playerHexes).length;

      if (hexesOwned) {

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
          let hexToAttack = ''
          let hexToAttackFrom = ''
          let minChanceToWin = 0
          let attackMatrixForPlayer = attackMatrix(board, id)

          if (playerStrengthQuotientThreshold) {
            let min = playerStrengthQuotientThreshold
            for (const playableHex in attackMatrixForPlayer) {
              attackMatrixForPlayer[playableHex].forEach(attackableHex => {
                let psq = findPlayerStrengthQuotient(board, attackableHex)
                if (psq <= min) {
                  min = psq
                  hexToAttack = attackableHex
                  hexToAttackFrom = playableHex
                }
              })
            }
          }

          if (attackStrategy === MINIMIZE_UNITS_LOST_RATIO && !hexToAttack) {
            // let playableHexes = Object.keys(attackMatrixForPlayer)
            // console.log('PLAYABLE HEXES ARE:', playableHexes)
            // playableHexes.forEach(hex => {

            // })

            for (const playableHex in attackMatrixForPlayer) {
              let minLostRatio = Infinity

              attackMatrixForPlayer[playableHex].forEach(attackableHex => {
                let attackUnits = board[playableHex].unit1
                let defendUnits = board[attackableHex].unit1
                console.log('attack units:', attackUnits)
                console.log('defend units:', defendUnits)
                let expectedUnits = battleMatrix[attackUnits][defendUnits].ExpectedUnits
                let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin
                let unitsLostRatio = (attackUnits - expectedUnits) / chanceToWin
                if (chanceToWin >= chanceToWinThreshold && unitsLostRatio < minLostRatio) {
                  minLostRatio = unitsLostRatio
                  hexToAttack = attackableHex
                  hexToAttackFrom = playableHex
                }
              })
            }
            hexToAttack && console.log('MINLOST HEX TO ATTACK IS', hexToAttack)
            hexToAttackFrom && console.log('MINLOST HEX TO ATTACK FROM IS', hexToAttackFrom)

          } else if (attackStrategy === MAXIMIZE_TERRITORY_GAINS && !hexToAttack) {

            for (const playableHex in attackMatrixForPlayer) {
              attackMatrixForPlayer[playableHex].forEach(attackableHex => {
                let attackUnits = board[playableHex].unit1
                let defendUnits = board[attackableHex].unit1
                console.log('attack units:', attackUnits)
                console.log('defend units:', defendUnits)
                let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin
                if (chanceToWin >= minChanceToWin) {
                  minChanceToWin = chanceToWin
                  hexToAttack = attackableHex
                  hexToAttackFrom = playableHex
                }
              })
            }
            hexToAttack && console.log('MAXTERR HEX TO ATTACK IS', hexToAttack)
            hexToAttackFrom && console.log('MAXTERR HEX TO ATTACK FROM IS', hexToAttackFrom)
          }

          hexToAttack && attack(hexToAttackFrom, hexToAttack, board)
          !hexToAttack && console.log('NO ADVANTAGEOUS ATTACK MOVES TO MAKE')
          // when player is ready to end battle phase
          // will need logic to determine when to end battle (i.e. unfavorable odds, no more moves to make etc.)
          inBattle = false
          // if (!hexToAttack) inBattle = false
        }
        //       if (/* player has no units left */ !player.units /**/) {
        //         player.rank = gameRank;
        //         player.inGame = false;
        //         gameRank--;
        //         return;
        //       }
        //       //logic for draws
        //       //fortification logic

      }

    })
    gameRank--
  }


  //     if (player.inGame) {
  //       //allotment logic
  //
  //     }
  //   })

  // //when game is over
  // trueskill.AdjustPlayers(players)
  //each player now has accurate 'trueskill' value as player.rank
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
