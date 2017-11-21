const trueskill = require('trueskill')
// setup()
//  # Step 1: The populating
//    # Create an empty populationation (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

function AIgenome() {

    this.chanceToWinThreshold = Math.random()
    this.playerStrengthQuotientThreshold =
      Math.round(Math.random())
        ? Math.random()
        : null
    this.attackStrategy =
      Math.round(Math.random())
        ? 'maximizeTerritoryGains'
        : 'minimizeUnitsLostRatio'
    this.allotmentStrategy =
      Math.round(Math.random())
        ? 'differenceInUnits'
        : 'ratioOfUnits'
    this.trueSkill = [25, 25/3]
  }

  function generateStartingGenomes() {
    let genomes = []
    for (let i=0; i<20; i++) {
      genomes.push(new AIgenome())
    }
    return genomes;
  }

  let genomes = generateStartingGenomes()

  // console.log(genomes)

  /* genomes: array of AI players with random genetic material
  have these players play eachother (groups of 4)

  something like:
    for(let i=0; i<20; i+=4) {
      play(genomes[i], genomes[i+1], genomes[i+2], genomes[i+3])
    }

  (`play` function still has to be defined)
  (consider re-writing all AI functions as methods?)

  after gameplay, assign fitness property


  something like:
    function play(player1, player2, player3, player4) {
      let gameRank = arguments.length; //# of players
      ...
      if (${player} has no units left) {
        player.gameRank = gameRank;
        gameRank--
      }
    }
  */

  function getFitness(genomes) {

  }
