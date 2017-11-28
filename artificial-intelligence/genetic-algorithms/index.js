'use strict'
const fs = require('fs')
const path = require('path')
const { generateStartingGenomes } = require('./population')
const { play } = require('./play')
const { populateNextGeneration } = require('./reproduction')

// QUESTION
// ran into error while running to test (screen shot saved - 'JavaScipt heap out of memory').

/* generate starting genomes: array of 20 AI players with random genetic material */

let genomes = generateStartingGenomes()
console.log(genomes)

let results = {}

/* next step after generation: have these players play eachother (groups of 4). Play several iterations for more accurate sense of skill (for weighting in 'mating pool') */
for (let totalIterations = 1; totalIterations <= 100; totalIterations++) {

  for (let i = 0; i < genomes.length; i += 4) {
    // 5 games in 4x4 free-for-all provide most accurate skill assesment;
    // can increase later
    for (let match = 1; match <= 3; match++) {
      let genomeResults = play(genomes[i], genomes[i + 1], genomes[i + 2], genomes[i + 3])
      results[i][match] = genomeResults
    }
  }
  // writeFileSync? + small delay
  fs.writeFileSync(path.join(__dirname, `results${totalIterations}.txt`), JSON.stringify(results))

  genomes = populateNextGeneration(genomes)
}


// console.log(genomes)
