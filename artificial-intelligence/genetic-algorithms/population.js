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
  for (let i = 1; i <= 100; i++) {
    genomes.push(new AIgenome(null, null, null, null, i))
  }
  return genomes;
}

module.exports = { AIgenome, generateStartingGenomes }
