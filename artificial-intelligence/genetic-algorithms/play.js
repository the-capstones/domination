'use strict'

/* eslint "no-loop-func": 0 */

const trueskill = require('trueskill')
const { hexagons } = require('../../client/functions/gridGenerator')

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

  hexagons.forEach(hex => {
    hex.id = `${hex.q},${hex.r},${hex.s}`;
    board[hex.id] = {
      movesLeft: 2,
      playerId: '',
      unit1: 1,
      unit2: 0,
      unit3: 0
    }
  });
}

function play(player1, player2, player3, player4) {
  // initialize board
  generateBoard(arguments)

  let players = [...arguments]
  let gameRank = players.length;
  players = shufflePlayerOrder(players)



  while (gameRank > 0) {
    players.forEach(player => {
      if (player.inGame) {
        //allotment logic
        //battle logic
        if (/* player has no units left */ !player.units /**/) {
          player.rank = gameRank;
          player.inGame = false;
          gameRank--;
          return;
        }
        //logic for draws
        //fortification logic
      }
    })
  }
  //when game is over
  trueskill.AdjustPlayers(players)
  //each player now has accurate 'trueskill' value as player.rank
}
console.log(hexagons)

module.exports = { shufflePlayerOrder, play }
