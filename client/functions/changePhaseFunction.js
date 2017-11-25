import firebase from '../firebase';
import { calcAllotmentPoints, getCurrentPoints } from '../functions';

export function changePhaseFunction(
    inputCurrentPhase,
    inputCurrentPlayer,
    inputPlayerOrder,
    inputAllotmentPointsPerTurn,
    inputHexagons,
    inputBoardId
  ) {
    console.log('changePhaseFunction has ran')
    if (inputCurrentPhase === 'allotment') {
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'attack' });
      setTimeout(() => {
        const allGuis = document.getElementsByClassName('allotment-guis');
        [...allGuis].forEach(gui => gui.classList.remove('show'));
      }, 300)
    }
    else if (inputCurrentPhase === 'fortification' || inputCurrentPhase === 'attack') {
      const currIdx = inputPlayerOrder.indexOf(inputCurrentPlayer);
      let nextIdx;

      if (currIdx === inputPlayerOrder.length - 1) {
        nextIdx = 0;
      }
      else {
        nextIdx = currIdx + 1;
      }
      const nextPlayer = inputPlayerOrder[nextIdx];
      calcAllotmentPoints(inputBoardId, inputHexagons);
      const currentAllotment = getCurrentPoints(inputAllotmentPointsPerTurn, nextPlayer);
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPlayer: nextPlayer, allotmentLeft: currentAllotment, currentPhase: 'allotment' });
      // firebase.ref(`/boards/${inputBoardId}/state`).update({ allotmentLeft: currentAllotment });
      // firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'allotment' });
    }
  }
