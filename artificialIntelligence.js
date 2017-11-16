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
const twoDiceProbability = expectedProbability(twoDice);
const threeDiceProbability = expectedProbability(threeDice);
