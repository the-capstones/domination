'use strict'
const trueskill = require('trueskill')
const { hexagons } = require('../funcs/gridGenerator')
const { divvySpaces } = require('../funcs/divvySpaces')
const { nextAllotment } = require('../allotmentFunction')
const { battleMatrix } = require('../battleMatrix')
const {
  myHexes,
  attackMatrix,
  findPlayerStrengthQuotient,
  findAllEnemyHexesOnBoard
} = require('../attackMatrixCreator')

const TERRITORIES_PER_UNIT_ALLOTTED = 15
const MAXIMIZE_TERRITORY_GAINS = 'maximizeTerritoryGains'
const MINIMIZE_UNITS_LOST_RATIO = 'minimizeUnitsLostRatio'
const DIFFERENCE_IN_UNITS = 'differenceInUnits'
const RATIO_OF_UNITS = 'ratioOfUnits'


/* eslint "no-loop-func": 0 */

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
  hexToAllotTo && board[hexToAllotTo].unit1++
  console.log(`allotted unit to ${hexToAllotTo}.`)
  hexToAllotTo && console.log(`units on territory: ${board[hexToAllotTo].unit1}`)
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
        allotmentStrategy,
        id
      } = player

      console.log('********************************************')
      console.log(`********** STARTING PLAYER ${id} TURN **********`)
      console.log('********************************************')
      let playerHexes = myHexes(board, id);
      let hexesOwned = Object.keys(playerHexes).length;

      if (hexesOwned) {
        let allotment = Math.max(Math.floor(hexesOwned / TERRITORIES_PER_UNIT_ALLOTTED), 3)
        console.log(`starting allotment: ${allotment} based on ${hexesOwned} territories`)

        while (allotment) {
          allot(player, board)
          allotment--
          console.log(`allotment remaining: ${allotment}`)
          console.log('--------------------------------------------')
        }

        //battle logic
        let inBattle = true
        console.log('************* BEGINNING BATTLE *************')

        while (inBattle) {
          let attackMatrixForPlayer = attackMatrix(board, id)
          console.log(attackMatrixForPlayer)
          console.log('--------------------------------------------')
           // do battle stuff

           if (attackStrategy === MAXIMIZE_TERRITORY_GAINS) {
             // look at CTW only
           } else {
             // look at (attacking units - expected units) / CTW
           }

          if (playerStrengthQuotientThreshold) {

            let enemyHexes = findAllEnemyHexesOnBoard(board, id)
            let min = Infinity

            enemyHexes.forEach(enemyHex => {
              let psq = findPlayerStrengthQuotient(board, enemyHex)
              if (psq < min) min = psq
              // console.log(`player strength quotient for ${enemyHex}: ${psq}`)
            })

            if (min < playerStrengthQuotientThreshold) {
            console.log(`MIN PSQ: ${min}`)
          }
        }
           // when player is ready to end battle phase
           // will need logic to determine when to end battle (i.e. unfavorable odds, no more moves to make etc.)
           inBattle = false
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
  playerStrengthQuotientThreshold: 0.4,
  attackStrategy: 'minimizeUnitsLostRatio',
  allotmentStrategy: 'differenceInUnits',
  skill: [25, 25 / 3]
}

play(p1, p2, p3, p4)

module.exports = { shufflePlayerOrder, play }
