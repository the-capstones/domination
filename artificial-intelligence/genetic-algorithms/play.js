'use strict'
const trueskill = require('trueskill')
const { hexagons } = require('../funcs/gridGenerator')
const { divvySpaces } = require('../funcs/divvySpaces')
const { myHexes, playableHexes, attackableHexes } = require('../attackMatrixCreator')
const { nextAllotment } = require('../allotmentFunction')

const TERRITORIES_PER_UNIT_ALLOTTED = 15

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
  board[hexToAllotTo].unit1++
  console.log(`allotted unit to ${hexToAllotTo}. Units on territory: ${board[hexToAllotTo].unit1}`)
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
      console.log('********************************************')
      console.log(`********** STARTING PLAYER ${player.id} TURN **********`)
      console.log('********************************************')
      let playerHexes = myHexes(board, player.id);
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
  allotmentStrategy: 'differenceInUnits'
}

let p2 = {
  id: 2,
  chanceToWinThreshold: 0.6,
  playerStrengthQuotientThreshold: null,
  attackStrategy: 'maximizeTerritoryGains',
  allotmentStrategy: 'ratioOfUnits'
}

let p3 = {
  id: 3,
  chanceToWinThreshold: 0.7,
  playerStrengthQuotientThreshold: null,
  attackStrategy: 'minimizeUnitsLostRatio',
  allotmentStrategy: 'ratioOfUnits'
}

let p4 = {
  id: 4,
  chanceToWinThreshold: 0.4,
  playerStrengthQuotientThreshold: 0.4,
  attackStrategy: 'minimizeUnitsLostRatio',
  allotmentStrategy: 'differenceInUnits'
}

play(p1, p2, p3, p4)

module.exports = { shufflePlayerOrder, play }
