'use strict'
const trueskill = require('trueskill')
const { hexagons } = require('../funcs/gridGenerator')
const { divvySpaces } = require('../funcs/divvySpaces')
const { myHexes, playableHexes } = require('../attackMatrixCreator')
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
      playerHexes = myHexes(board, player.id);
      hexesOwned = playerHexes.length;

      if (hexesOwned) {
        let allotment = Math.max(Math.floor(hexesOwned / TERRITORIES_PER_UNIT_ALLOTTED), 3)

        while (allotment) {
          allot(player, board)
          allotment--
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

    }
    }
}


//     if (player.inGame) {
//       //allotment logic
//
//     }
//   })

// //when game is over
trueskill.AdjustPlayers(players)
  //each player now has accurate 'trueskill' value as player.rank
}

play({ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 })

module.exports = { shufflePlayerOrder, play }
