'use strict'
const fs = require('fs')
const path = require('path')
const { generateStartingGenomes } = require('./population')
const { play } = require('./play')
const { populateNextGeneration } = require('./reproduction')

/* generate starting genomes: array of 20 AI players with random genetic material */

let genomes = generateStartingGenomes()


let results = {}
let oldGenomes = {}
/* next step after generation: have these players play eachother (groups of 4). Play several iterations for more accurate sense of skill (for weighting in 'mating pool') */
for (let totalIterations = 1; totalIterations <= 50; totalIterations++) {
  for (let i = 0; i < genomes.length; i += 4) {
    // 5 games in 4x4 free-for-all provide most accurate skill assesment;
    // can increase later
    for (let match = 1; match <= 20; match++) {
      let genomeResults = play(genomes[i], genomes[i + 1], genomes[i + 2], genomes[i + 3]);
      // const used = process.memoryUsage().heapUsed / 1024 / 1024;
      // console.log(`The entire process is currently using approximately ${used} MB`);
      if (!results[i]) {
        results[i] = {};
      }
      if (!results[i][match]) {
        results[i][match] = {};
      }
      results[i][match] = genomeResults
    }
  }
  // writeFileSync? + small delay
  fs.writeFileSync(path.join(__dirname, `results${totalIterations}.js`), JSON.stringify(results))
  oldGenomes = genomes
  genomes = populateNextGeneration(genomes)
}
