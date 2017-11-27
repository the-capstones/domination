/* eslint "guard-for-in": 0 */
/* eslint "no-loop-func": 0 */


// setup()
//  # Step 1: The populating
//    # Create an empty populationation (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

function AIgenome(CTWmin, PSQmin, attackStrategy, allotmentStrategy, id) {

  this.chanceToWinThreshold = CTWmin || Math.random()
  this.playerStrengthQuotientThreshold = PSQmin ||
    Math.round(Math.random())
    // after testing min/max PSQ on several rounds with
    // 4x4 AIvAI on 10x12 board, range of ~3-9
    // this range increases as board gets larger
    // (was ~4-15 on 12x18 board)
    ? Math.random() * 9
    : null
  this.attackStrategy = attackStrategy ||
    Math.round(Math.random())
    ? 'maximizeTerritoryGains'
    : 'minimizeUnitsLostRatio'
  this.allotmentStrategy = allotmentStrategy ||
    Math.round(Math.random())
    ? 'differenceInUnits'
    : 'ratioOfUnits'
  //initializing skill using TrueSkill default
  this.skill = [25, 25 / 3]
  this.id = id
}

function generateStartingGenomes() {
  let genomes = []
  for (let i = 1; i <= 20; i++) {
    genomes.push(new AIgenome(null, null, null, null, i))
  }
  return genomes;
}

<<<<<<< Updated upstream
module.exports = { AIgenome, generateStartingGenomes }
=======
let genomes = generateStartingGenomes()

// console.log(genomes)

/* genomes: array of AI players with random genetic material
have these players play eachother (groups of 4)

something like:
  for(let i=0; i<20; i+=4) {
    for(let j=1; j<=3; j++) {
      play(genomes[i], genomes[i+1], genomes[i+2], genomes[i+3])
    }
  }

(`play` function still has to be defined)
(consider re-writing all AI functions as methods?)

after gameplay, assign fitness property


something like:
  function play(player1, player2, player3, player4) {
    let players = [...args]
    let gameRank = players.length; //# of players

    ...
    if (${player} has no units left) {
      player.rank = gameRank;
      gameRank--
      // somehow control for draws
    }
    //when game ends
    trueskill.AdjustPlayers(players)
    //each player now has accurate 'trueskill' value as player.rank
  }
*/

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
  players = shufflePlayerOrder(players)
  let gameRank = players.length;

  //need to keep track of players in game - while player

  while (gameRank > 0) {
    players.forEach(player, function takeTurn(player) {
      //allotment logic
      //battle logic
      if (/* player has no units left */ !player.units /**/) {
        player.rank = gameRank;
        gameRank--;
      }
      //fortification logic
    })
  }
}

function getFitness(genomes) {
  //true skill default skill setting is 25, so sum of all genomes's skill will be 25*genomes.length
  return genomes.map(genome => (genome.skill) / (genomes.length*25))
}

>>>>>>> Stashed changes
