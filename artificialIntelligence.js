// Dice Combinatorics

// Step 1) Build a function that creates an array of all
// possible combinations of a given number of dice

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
    counter--;
  }
  return results;
}

// diceCombinations(2) will return all combinations of two dice rolls

// Step 2) Find the highest number in each array combination of dice rolls

const twoDice = diceCombinations(2).map(arr => Math.max(...arr));
const threeDice = diceCombinations(3).map(arr => Math.max(...arr));

// Step 3) Create an expected probability Object for a given frequency analysis of max dice roll.

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
// Step 4) Define the probability objects for two dice and three dice for easy reference
const defendObj = expectedProbability(twoDice);
const attackObj = expectedProbability(threeDice);

// Step 5) Calculate the probability that an attacker will win in a 1 on 1 battle
function calculateAttackerWinPercentage(arr, attackObj, defendObj){
  let attackerWinPercentage = 0
  arr.forEach(diceCombo => {
      if (diceCombo[0] > diceCombo[1]) {
        //   console.log(diceCombo, 'attacker won')
          attackerWinPercentage += attackObj[diceCombo[0]] * defendObj[diceCombo[1]]
      } else {
        //   console.log(diceCombo, 'defender won')
        }
  })
  return attackerWinPercentage
}

const attackerWinPercentage = calculateAttackerWinPercentage(diceCombinations(2), attackObj, defendObj)
// console.log(attackerWinPercentage)

function bestDamnedBattleMatrix(originalA, originalD, currentA, currentD, aWinPercent, battleObject = {}){
// track the start time of this function
// build the object structure if it doesn't already exist
if (!battleObject[originalA]){battleObject[originalA] = {}}
if (!battleObject[originalA][originalD]){battleObject[originalA][originalD] = {}}
if (!battleObject[originalA][originalD].A){battleObject[originalA][originalD].A = {}}
if (!battleObject[originalA][originalD].D){battleObject[originalA][originalD].D = {}}
// define the probability calculation for the leaves of the tree
let probabilityCalc = Math.pow(aWinPercent, (originalD - currentD)) *
Math.pow((1 - aWinPercent), (originalA - currentA))
// if all the attackers are dead, add to the battle matrix for the defender
if (currentA === 0) {
    // if this object has already been hit by another leaf, we want to add to it, not replace it
    if (battleObject[originalA][originalD].D[currentD]) {
        battleObject[originalA][originalD].D[currentD] += probabilityCalc
    } else { // if not, we'll just initialize it
    battleObject[originalA][originalD].D[currentD] = probabilityCalc
}
}
// if all the defenders are dead, add to the battle matrix for the attacker
else if (currentD === 0) {
    // if this object has already been hit by another leaf, we want to add to it, not replace it
    if (battleObject[originalA][originalD].A[currentA]) {
        battleObject[originalA][originalD].A[currentA] += probabilityCalc
    } else { // if not, we'll just initialize it
    battleObject[originalA][originalD].A[currentA] = probabilityCalc
}
}
// if there are still units on both sides, split the tree
else {
    bestDamnedBattleMatrix(originalA, originalD, currentA - 1, currentD, aWinPercent, battleObject)
    bestDamnedBattleMatrix(originalA, originalD, currentA, currentD - 1, aWinPercent, battleObject)
}
// log the end time of this function
}
console.time('start')
let fullBattleMatrix = {}
bestDamnedBattleMatrix(17, 17, 17, 17, attackerWinPercentage, fullBattleMatrix)
console.timeEnd('start')
console.log(fullBattleMatrix[17][17])

//building a battle matrix times by match up
// 17 v 17 - 336 seconds
// 16 v 16 - 89 seconds
// 15 v 15 - 24 seconds
// 14 v 14 - 6 seconds
// 13 v 13 - 1.5 seconds
// 12 v 12 - 0.5 seconds