'use strict'
import firebase from '../firebase';
import { highlightNeighbors, calcAllotmentPoints, getCurrentPoints, removeAllHighlights } from '../functions';

export function changePhaseFunction(
    inputCurrentPhase,
    inputCurrentPlayer,
    inputPlayerOrder,
    inputAllotmentPointsPerTurn,
    inputHexagons,
    inputBoardId,
    selectedHex,
  ) {
    // console.log('changePhaseFunction has run')
    removeAllHighlights()
    if (inputCurrentPhase === 'allotment') {
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPhase: 'attack', selectedHex: '' })
    }
    else if (inputCurrentPhase === 'attack'){
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
      let currentAllotment = getCurrentPoints(inputAllotmentPointsPerTurn, nextPlayer);
      // console.log('current Allotment',currentAllotment)
      if (isNaN(currentAllotment)) {
        currentAllotment = 3
      }
      firebase.ref(`/boards/${inputBoardId}/state`).update({ currentPlayer: nextPlayer, allotmentLeft: currentAllotment, currentPhase: 'allotment', selectedHex: '' });
    }
  }
