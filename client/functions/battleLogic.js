import firebase from '../firebase';
import { getNeighbors } from './';

const winningCheck = (playerOrder) => {
  const onePlayerLeft = playerOrder.length === 1;

  if (onePlayerLeft) {
    alert(`${playerOrder[0]} wins!`);
  }
};

const playerDefeatedCheck = (boardId, hexagons, defendingPlayer, playerOrder) => {
  const hexagonsLeft = Object.entries(hexagons).filter(([id, hex]) => {
    return hex.playerId === defendingPlayer;
  });

  if (hexagonsLeft.length === 0) {
    const newPlayerOrder = playerOrder.filter(player => player !== defendingPlayer);
    firebase.ref(`/boards/${boardId}/state`).update({ playerOrder: newPlayerOrder })
    alert(`${defendingPlayer} has been defeated.`);
    winningCheck(newPlayerOrder);
  }
}

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

const takeOverSpace = (boardId, hexes, attackingHexId, defendingHexId, attackingUnits, playerOrder) => {
  const defeatedHex = hexes[defendingHexId];
  const defenderUsername = defeatedHex.playerId;
  const attackerUsername = hexes[attackingHexId].playerId;
  const conqueredHex = Object.assign({}, defeatedHex, {
    playerId: attackerUsername,
    unit1: attackingUnits,
    // movesLeft: 0,
  });

  firebase.ref(`/boards/${boardId}/hexes/${defendingHexId}`).update(conqueredHex);

  const updatedHexes = Object.assign({}, hexes);
  updatedHexes[defendingHexId].playerId = attackerUsername;
  playerDefeatedCheck(boardId, updatedHexes, defenderUsername, playerOrder)
  return true;
}

const displayResult = (winnerId, loserId, unitOrSpace) => {
  const resultElement = document.getElementById('result');
  const guiMessage = `${winnerId} wins. ${loserId} loses a ${unitOrSpace}.`;

  resultElement.innerHTML = guiMessage;
}

export const handleRoll = ({ boardId, hexes, endCombat, attackingHexId, defendingHexId, attackingUnits, defendingUnits, attackerName, defenderName, playerOrder }) => {

  const attackerNeighbors = getNeighbors(attackingHexId);
  const isValidMove = attackerNeighbors.includes(defendingHexId);
  if (!isValidMove) return;

  // hexes[attackingHexId].movesLeft > 0
  //   && firebase.ref(`/boards/${boardId}/hexes/${attackingHexId}`).update({ movesLeft: 0 });

  const attackerRolls = [];
  const defenderRolls = [];
  const attackerDice = [...document.getElementsByClassName('die-container')];
  const defenderDice = [...document.getElementsByClassName('enemy-die-container')];

  attackerDice.filter(container => {
    const label = container.getElementsByTagName('label');
    const roll = dieRoll(1);
    label[0].innerHTML = "&#x268" + (roll - 1) + "; ";
    attackerRolls.push(roll);
  })

  defenderDice.filter(container => {
    const label = container.getElementsByTagName('label');
    const roll = dieRoll(1);
    label[0].innerHTML = "&#x268" + (roll - 1) + "; ";
    defenderRolls.push(roll);
  })

  const attackerHighestRoll = Math.max(...attackerRolls);
  const defenderHighestRoll = Math.max(...defenderRolls);

  if (attackerHighestRoll > defenderHighestRoll) {
    updateUnits(boardId, defendingHexId, defendingUnits - 1);
    displayResult(attackerName, defenderName, 'unit')

    const defenderLost = defendingUnits <= 1;
    defenderLost
    && takeOverSpace(boardId, hexes, attackingHexId, defendingHexId, attackingUnits - 1, playerOrder)
    && updateUnits(boardId, attackingHexId, 1)
    && endCombat(attackingHexId)
  } else {
    updateUnits(boardId, attackingHexId, attackingUnits - 1);
    displayResult(defenderName, attackerName, 'unit')

    const enoughAttackingUnits = attackingUnits - 1 > 1;
    !enoughAttackingUnits && endCombat(attackingHexId);
  }
}

