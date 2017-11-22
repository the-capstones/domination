/* eslint "guard-for-in": 0 */
/* eslint "no-loop-func": 0 */

const trueskill = require('trueskill')
// setup()
//  # Step 1: The populating
//    # Create an empty populationation (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

function AIgenome(CTWmin, PSQmin, attackStrategy, allotmentStrategy) {

  this.chanceToWinThreshold = CTWmin || Math.random()
  this.playerStrengthQuotientThreshold = PSQmin ||
    Math.round(Math.random())
    ? Math.random()
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
}

function generateStartingGenomes() {
  let genomes = []
  for (let i = 0; i < 20; i++) {
    genomes.push(new AIgenome())
  }
  return genomes;
}

let genomes = generateStartingGenomes()

console.log(genomes)

/* genomes: array of AI players with random genetic material
have these players play eachother (groups of 4)

something like:
  for(let i=0; i<genomes.length; i+=4) {
    for(let j=1; j<=3; j++) {
      play(genomes[i], genomes[i+1], genomes[i+2], genomes[i+3])
    }
  }

(consider re-writing all AI functions as methods?)
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

function acceptReject(genomes) {
  // generating random index to access genome from genome list
  let index = Math.floor(Math.random() * genomes.length)
  // look at corresponding fitness score and determine whether to accept or reject
  let maxFitness = 0;
  genomes.forEach(genome => {
    console.log('max fitness is', maxFitness)
    if (maxFitness < genome.skill[0]) maxFitness = genome.skill[0]
    console.log(genome.skill)
  })
  let minFitnessScore = Math.floor(Math.random() * maxFitness)
  if (minFitnessScore < genomes[index].skill[0]) return genomes[index]
  console.log(minFitnessScore)
  console.log('didnt meet min score')
  console.log(genomes[index])
  return acceptReject(genomes)
}

function reproduce(genomes) {
  let parentA = acceptReject(genomes)
  let parentB = acceptReject(genomes)


  let CTWmin = Math.random() < 0.5
    ? parentA.chanceToWinThreshold
    : parentB.chanceToWinThreshold

  let PSQmin = Math.random() < 0.5
    ? parentA.playerStrengthQuotientThreshold
    : parentB.playerStrengthQuotientThreshold

  let attackStrategy = Math.random() < 0.5
    ? parentA.attackStrategy
    : parentB.attackStrategy

  let allotmentStrategy = Math.random() < 0.5
    ? parentA.allotmentStrategy
    : parentB.allotmentStrategy

  return new AIgenome(CTWmin, PSQmin, attackStrategy, allotmentStrategy)

}

function populateNextGeneration(genomes) {
  let nextGeneration = []
  for (let i = 0; i < genomes.length; i++) {
    nextGeneration.push(reproduce(genomes))
  }
  return nextGeneration
}

let nextGeneration = populateNextGeneration(genomes)
console.log(nextGeneration)

