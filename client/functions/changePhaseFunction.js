'use strict'
import firebase from '../firebase';
import { calcAllotmentPoints, getCurrentPoints, removeAllHighlights } from '../functions';

export function changePhaseFunction(
    inputCurrentPhase,
    inputCurrentPlayer,
    inputPlayerOrder,
    inputAllotmentPointsPerTurn,
    inputHexagons,
    inputBoardId
  ) {
    console.log('changePhaseFunction has ran')
    removeAllHighlights()
    if (inputCurrentPhase === 'allotment') {
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'attack', selectedHex: '' })
        .then(() => {
          const allGuis = document.getElementsByClassName('allotment-guis');
          [...allGuis].forEach(gui => gui.classList.remove('show'));
        });
    } else if (inputCurrentPhase === 'attack'){
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'fortification', selectedHex: '' })
    }
    else if (inputCurrentPhase === 'fortification' ) {
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
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPlayer: nextPlayer, allotmentLeft: currentAllotment, currentPhase: 'allotment', selectedHex: '' });
      // firebase.ref(`/boards/${inputBoardId}/state`).update({ allotmentLeft: currentAllotment });
      // firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'allotment' });
    }
  }
