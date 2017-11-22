export const dieRoll = number => {
  const resultArray = [];

  while (number) {
    let roll = Math.floor(Math.random() * 6) + 1;

    resultArray.push(roll);
    number--;
  }

  return resultArray;
}

export const handleRoll = ({ updateUnits, attackingHexId, defendingHexId, attackingUnits, defendingUnits }) => {
  const attackerRolls = [];
  const defenderRolls = [];
  const attackerDice = [...document.getElementsByClassName('die-container')];
  const defenderDice = [...document.getElementsByClassName('enemy-die-container')];

  attackerDice.filter(container => {
    const label = container.getElementsByTagName('label');
    const roll = dieRoll(1);
    label[0].innerHTML = roll;
    attackerRolls.push(roll);
  })

  defenderDice.filter(container => {
    const label = container.getElementsByTagName('label');
    const roll = dieRoll(1);
    label[0].innerHTML = roll;
    defenderRolls.push(roll);
  })

  const attackerHighestRoll = Math.max(...attackerRolls);
  const defenderHighestRoll = Math.max(...defenderRolls);

  if (attackerHighestRoll > defenderHighestRoll) {
    updateUnits(defendingHexId, defendingUnits - 1);
  } else {
    updateUnits(attackingHexId, attackingUnits - 1);
  }
}
