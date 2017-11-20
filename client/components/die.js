export const Die = number => {
  const resultArray = [];

  let roll = Math.floor(Math.random() * 5) + 1;

  while (number) {
    resultArray.push(roll);
    number--;
  }

  return resultArray;
}
