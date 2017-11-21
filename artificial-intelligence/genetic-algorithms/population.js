
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
  have these players play eachother

  something like:
    for(let i=0; i<20; i+=2) {
      play(genomes[i], genomes[i+1])
    }

  (`play` function still has to be defined)
  (consider re-writing all AI functions as methods?)

  after gameplay, assign win property

  something like:
    function play(player1, player2) {
      ...
      if (${other player} has no units left) {
        player.won = true
      }
    }
  */

  function getFitness(genomes) {

  }
