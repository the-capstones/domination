export const dieRoll = number => {
  const resultArray = [];

  while (number) {
    let roll = Math.floor(Math.random() * 6) + 1;

    resultArray.push(roll);
    number--;
  }

  return resultArray;
}
