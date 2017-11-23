import { AIgenome } from './population'

// random sampling based off of Monte Carlo rejection sampling
export function selectParent(genomes) {
  let random = Math.random();
  for (var i = 0; random > 0; i++) {
    random -= genomes[i].skill
  }
  return genomes[--i]
}


export function reproduce(genomes) {
  let parentA = selectParent(genomes)
  let parentB = selectParent(genomes)

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

  let mutationRate = 0.01
  let mutate = Math.random() < mutationRate
  let geneVariations = [CTWmin, PSQmin, attackStrategy, allotmentStrategy]

  if (mutate) {
    geneVariations[Math.floor(Math.random() * 4)] = null
    console.log('***********MUTATING***********')
  }

  return new AIgenome(geneVariations)
}

export function populateNextGeneration(genomes) {
  let nextGeneration = []
  for (let i = 0; i < genomes.length; i++) {
    nextGeneration.push(reproduce(genomes))
  }
  return nextGeneration
}

