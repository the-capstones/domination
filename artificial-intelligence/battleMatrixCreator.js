const util = require('util');

// This file is responsible for creating the battle matrix

// The battle matrix is an object that calculates the probability of winning
// a territory with a given number of attacking units and defending units.


// Outline:
// Step 1: Build a function that creates an array of all
// possible combinations of a given number of dice rolls.
// Step 2: Find the highest number in each array combination of dice rolls.
// Step 3: Create an expected probability Object for a given frequency analysis of max dice roll.
// Step 4: Define the probability objects for attacker dice and defender dice for easy reference.
// Step 5: Calculate the probability that an attacker will win in a 1 on 1 battle
// Step 6: Create the battle matrix for a variable number of attackers and defenders

// You can change the game logic for this by manipulating the variables below

// Define the game logic:
// attackDice: number of dice rolled by the attacker. Minimum 1 die.
// **NOTE: This gets really slow above 8 die!**
const attackDice = 3;
// defendDice: number of dice rolled by the defender. Minimum 1 die.
// **NOTE: This gets really slow above 8 die!**
const defendDice = 2;
// maxUnits: This defines the max number of units that a player can have on a territory.
// **NOTE: This gets really slow above 15 units!**
const maxUnits = 15
// console.log the variables
console.log('----------------');
console.log('----------------');
console.log(
  'In each battle the attacker will roll ',
  attackDice,
  'dice. The defender will roll ',
  defendDice,
  "dice. The highest die of each party's rolls will be compared.",
  "The attacker wins only if his die roll is higher than the defender's die roll.",
  'In the event of a tie, the defender wins.',
  'The maximum number of units on a territory is',
  maxUnits,
  '. Because an attacker must leave 1 unit on a territory at all times, they can attack with at most',
  maxUnits - 1,
  'units at a time.'
);
console.log('----------------');

// Dice Combinatorics

// Step 1: Build a function that creates an array of all
// possible combinations of a given number of dice rolls.

function diceCombinations(numDice) {
  counter = numDice - 1;
  results = [[1], [2], [3], [4], [5], [6]];
  newResults = [];
  while (counter > 0) {
    results.forEach(elem => {
      newResults.push(
        elem.concat([1]),
        elem.concat([2]),
        elem.concat([3]),
        elem.concat([4]),
        elem.concat([5]),
        elem.concat([6])
      );
    });
    results = newResults;
    newResults = []
    counter--;
  }
  return results;
}

// Example usage: diceCombinations(2) will return all combinations of two dice rolls

// Step 2: Find the highest number in each array combination of dice rolls.

const defendersDiceRolls = diceCombinations(defendDice).map(arr =>
  Math.max(...arr)
);
const attackersDiceRolls = diceCombinations(attackDice).map(arr =>
  Math.max(...arr)
);

// Step 3: Create an expected probability Object for a given frequency analysis of max dice roll.

function expectedProbability(arr) {
  const totalCombinations = arr.length;
  const probabilityObject = {};
  arr.forEach(value => {
    if (probabilityObject[value]) {
      probabilityObject[value] = probabilityObject[value] + 1;
    } else {
      probabilityObject[value] = 1;
    }
  });
  Object.keys(probabilityObject).forEach(
    key => (probabilityObject[key] = probabilityObject[key] / totalCombinations)
  );
  return probabilityObject;
}
// Step 4: Define the probability objects for attacker dice and defender dice for easy reference.
const attackObj = expectedProbability(attackersDiceRolls);
const defendObj = expectedProbability(defendersDiceRolls);
console.log(
  'Based on the variables above, the following object gives the chance for the highest die roll of the attacker.'
);
console.log(attackObj);
console.log('----------------');
console.log(
  'Based on the variables above, the following object gives the chance for the highest die roll of the defender.'
);
console.log(defendObj);
console.log('----------------');
// Step 5: Calculate the probability that an attacker will win in a 1 on 1 battle
function calculateAttackerWinPercentage(arr, attackObj, defendObj) {
  let attackerWinPercentage = 0;
  arr.forEach(diceCombo => {
    if (diceCombo[0] > diceCombo[1]) {
      //   console.log(diceCombo, 'attacker won')
      attackerWinPercentage +=
        attackObj[diceCombo[0]] * defendObj[diceCombo[1]];
    } else {
      //   console.log(diceCombo, 'defender won')
    }
  });
  return attackerWinPercentage;
}

const attackerWinPercentage = calculateAttackerWinPercentage(
  diceCombinations(2),
  attackObj,
  defendObj
);
console.log(
  'In any given 1 on 1 battle, the attacker should win ',
  (attackerWinPercentage * 100).toFixed(2),
  '% of the time.'
);
console.log('----------------');

// Step 6: Create the battle matrix for a variable number of attackers and defenders

function bestDamnedBattleMatrix(
  originalA,
  originalD,
  currentA,
  currentD,
  battleObject = {}
) {
  // track the start time of this function
  // build the object structure if it doesn't already exist
  if (!battleObject[originalA]) {
    battleObject[originalA] = {};
  }
  if (!battleObject[originalA][originalD]) {
    battleObject[originalA][originalD] = {};
  }
  if (!battleObject[originalA][originalD].A) {
    battleObject[originalA][originalD].A = {};
  }
  if (!battleObject[originalA][originalD].D) {
    battleObject[originalA][originalD].D = {};
  }
  // define the probability calculation for the leaves of the tree
  let probabilityCalc =
    Math.pow(attackerWinPercentage, originalD - currentD) *
    Math.pow(1 - attackerWinPercentage, originalA - currentA);
  // if all the attackers are dead, add to the battle matrix for the defender
  if (currentA === 0) {
    // if this object has already been hit by another leaf, we want to add to it, not replace it
    if (battleObject[originalA][originalD].D[currentD]) {
      battleObject[originalA][originalD].D[currentD] += probabilityCalc;
    } else {
      // if not, we'll just initialize it
      battleObject[originalA][originalD].D[currentD] = probabilityCalc;
    }
  } else if (currentD === 0) {
    // if all the defenders are dead, add to the battle matrix for the attacker
    // if this object has already been hit by another leaf, we want to add to it, not replace it
    if (battleObject[originalA][originalD].A[currentA]) {
      battleObject[originalA][originalD].A[currentA] += probabilityCalc;
    } else {
      // if not, we'll just initialize it
      battleObject[originalA][originalD].A[currentA] = probabilityCalc;
    }
  } else {
    // if there are still units on both sides, split the tree
    bestDamnedBattleMatrix(
      originalA,
      originalD,
      currentA - 1,
      currentD,
      battleObject
    );
    bestDamnedBattleMatrix(
      originalA,
      originalD,
      currentA,
      currentD - 1,
      battleObject
    );
  }
}

// Below, you'll see the time required to create a battle matrix by units matched up.
// As the size of each army increases, the time required to run the code increases by about 400%
// 17 v 17 - 336 seconds
// 16 v 16 - 89 seconds
// 15 v 15 - 24 seconds
// 14 v 14 - 6 seconds
// 13 v 13 - 1.5 seconds
// 12 v 12 - 0.5 seconds

let fullBattleObject = {};

function battleProbabilityMatrixCreator(
  maxAttackUnits,
  maxDefendUnits,
) {
  for (let i = 1; i <= maxAttackUnits; i++) {
    for (let j = 1; j <= maxDefendUnits; j++) {
      bestDamnedBattleMatrix(
        i,
        j,
        i,
        j,
        fullBattleObject
      );
    }
  }
}

battleProbabilityMatrixCreator(maxUnits - 1, maxUnits);

function expectedBattleOutcome(fullBattleObj) {
  for (const attackerUnits in fullBattleObj) {
    for (const defenderUnits in fullBattleObj[attackerUnits]) {
      let winPercentage = 0;
      let expectedUnits = 0;
      for (const attackerUnitsLeft in fullBattleObj[attackerUnits][
        defenderUnits
      ].A) {
        winPercentage +=
          fullBattleObj[attackerUnits][defenderUnits].A[attackerUnitsLeft];
        expectedUnits +=
          fullBattleObj[attackerUnits][defenderUnits].A[attackerUnitsLeft] *
          attackerUnitsLeft;
      }
      fullBattleObj[attackerUnits][defenderUnits] = {
        ChanceToWin: winPercentage,
        ExpectedUnits: expectedUnits
      };
    }
  }
}

expectedBattleOutcome(fullBattleObject);
console.log("Below, you'll see a battle probability matrix object.",
'The first key in the object is the number of units the attacker has.',
'The second key represents the number of units the defender has.',
"In the last section, you'll see the expected chance of the attacker winning that engagement and the expected number of units they would have if they went through with the attack.")
console.log('----------------');
console.log(util.inspect(fullBattleObject, false, null));
