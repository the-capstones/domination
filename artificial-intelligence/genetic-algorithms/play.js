'use strict'

/* eslint "no-loop-func": 0 */

const trueskill = require('trueskill')

function shufflePlayerOrder(playerArray) {
  for (let i = 0; i < playerArray.length; i++) {
    let j = Math.floor(Math.random() * (playerArray.length))
    let temp = playerArray[i]
    playerArray[i] = playerArray[j]
    playerArray[j] = temp
  }
  return playerArray
}

function play(player1, player2, player3, player4) {
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

module.exports = { shufflePlayerOrder, play }
