import firebase from '../firebase';

export const dieRoll = number => {
  const resultArray = [];

  while (number) {
    let roll = Math.floor(Math.random() * 6) + 1;

    resultArray.push(roll);
    number--;
  }

  return resultArray;
}

const updateUnits = (boardId, hexId, units) => {
  firebase.ref(`/boards/${boardId}/hexes/${hexId}`).update({ unit1: units });
  return true;
}

const takeOverSpace = (boardId, hexes, attackingHexId, defendingHexId, attackingUnits) => {
  const defeatedHex = hexes[defendingHexId];
  const attackerUsername = hexes[attackingHexId].playerId;
  const conqueredHex = Object.assign({}, hexes[defendingHexId], {
    playerId: attackerUsername,
    unit1: attackingUnits
  });

  firebase.ref(`/boards/${boardId}/hexes/${defendingHexId}`).update(conqueredHex);
  return true;
}

export const handleRoll = ({ boardId, hexes, endCombat, attackingHexId, defendingHexId, attackingUnits, defendingUnits }) => {

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
    updateUnits(boardId, defendingHexId, defendingUnits - 1);

    const defenderLost = defendingUnits === 0;
    defenderLost
    && takeOverSpace(boardId, hexes, attackingHexId, defendingHexId, attackingUnits)
    && updateUnits(boardId, attackingHexId, 1)
    && endCombat();
  } else {
    updateUnits(boardId, attackingHexId, attackingUnits - 1);

    const enoughAttackingUnits = attackingUnits - 1 > 1;
    !enoughAttackingUnits && endCombat();
  }
}
