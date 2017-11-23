'use strict'

import { AIgenome, generateStartingGenomes } from './population'
import play from './play'
import { populateNextGeneration } from './reproduction'

/* generate starting genomes: array of 20 AI players with random genetic material */
let genomes = generateStartingGenomes()
// console.log(genomes)

/* next step after generation: have these players play eachother (groups of 4). Play several iterations for more accurate sense of skill (for weighting in 'mating pool') */

// for (let i = 0; i < genomes.length; i += 4) {
//   // 5 games needed in 4x4 free-for-all for accurate assesment of skill;
//   // can increase later
//   for (let j = 1; j <= 3; j++) {
//     play(genomes[i], genomes[i + 1], genomes[i + 2], genomes[i + 3])
//   }
// }

let nextGeneration = populateNextGeneration(genomes)
console.log(nextGeneration)
