'use strict'
/* eslint "guard-for-in": 0 */
/* eslint "no-loop-func": 0 */
/* eslint "max-statements": 0 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'
import { changePhaseFunction } from '../functions'
import {
  bestMove,
  findPlayerStrengthQuotient,
  attackMatrix,
  nextAllotment,
  battleMatrix,
  rollDiceAndReturnMax
} from '../../artificial-intelligence'


function AIturn(props) {
  const {
    phase,
    id,
    board,
    allotment,
    allotmentPointsPerTurn,
    playerOrder,
    allot,
    attack,
    fortify,
    currentPlayer,
   } = props

  return (
    <div id="ai-turn">
      <h1> Zero's turn!</h1>
      {phase === 'allotment' && allot(allotment, board, id)}
      {phase === 'attack' && attack(board, id, currentPlayer)}
      {phase === 'fortification' && fortify(board, id, playerOrder, allotmentPointsPerTurn, currentPlayer)}
    </div>
  )
}

const mapState = state => {
  return {
    board: state.board.hexes,
    id: state.board.state.currentPlayer,
    phase: state.board.state.currentPhase,
    // playerHexes: Object.keys(state.board.hexes).filter(hex => state.board[hex].playerId === id),
    allotment: state.board.state.allotmentLeft,
    playerOrder: state.board.state.playerOrder,
    allotmentPointsPerTurn: state.board.state.allotmentPointsPerTurn,
    currentPlayer: state.board.state.currentPlayer

  }
}

const mapDispatch = (dispatch, ownProps) => {
  let boardId = ownProps.match.params.boardId
  let hexesAllotedTo = []
  
  return {

    allot(allotment, board, id) {
      if (allotment) {
        let hexToAllotTo = nextAllotment(board, id)

        if (hexToAllotTo) {
          let newUnits = board[hexToAllotTo].unit1 + 1
          hexesAllotedTo.push(hexToAllotTo)
          allotment--
          firebase.ref(`/boards/${boardId}/state`)
            .update({ allotmentLeft: allotment })
            .then(
            firebase.ref(`/boards/${boardId}/hexes/${hexToAllotTo}`)
              .update({ unit1: newUnits }))
            .then(() => {
              // console.log('ALLOTED UNITS TO', hexesAllotedTo)
            })
        } else {
          return null
        }
      } else {
        firebase.ref(`boards/${boardId}/state`)
          .update({ currentPhase: 'attack' })
      }
    },

    attack(board, id, currentPlayer) {
      // console.log('ATTACK')
      let minChanceToWin = 0.40
      let hexToAttack = ''
      let hexToAttackFrom = ''
      let maxPSQ = 1.64
      let playerAttackMatrix = attackMatrix(board, id)

      for (const playableHex in playerAttackMatrix) {
        playerAttackMatrix[playableHex].forEach(attackableHex => {
          let psq = findPlayerStrengthQuotient(board, attackableHex)
          if (psq <= maxPSQ) {
            maxPSQ = psq
            hexToAttack = attackableHex
            hexToAttackFrom = playableHex
          }

          let attackUnits = board[playableHex].unit1 - 1
          let defendUnits = board[attackableHex].unit1
          // console.log(`${attackUnits} VS ${defendUnits}`)

          if (!hexToAttack) {
            let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin
            // console.log('chanceToWin:', chanceToWin)

            if (chanceToWin >= minChanceToWin) {
              minChanceToWin = chanceToWin
              hexToAttack = attackableHex
              hexToAttackFrom = playableHex
            }
          }
        })
      }

      if (hexToAttack) {
        let attackUnits = board[hexToAttackFrom].unit1
        let defendUnits = board[hexToAttack].unit1

        while (attackUnits > 1 && defendUnits > 0) {
          // console.log(`attack units: ${attackUnits}`)
          // console.log(`defend units: ${defendUnits}`)
          let attackDiceRoll = rollDiceAndReturnMax(3)
          let defendDiceRoll = rollDiceAndReturnMax(2)
          // console.log(`${hexToAttackFrom} ATTACKING ~~~~~~~~> ${hexToAttack}`)
          // console.log(`attacker rolled ${attackDiceRoll}`)
          // console.log(`defender rolled ${defendDiceRoll}`)

          let hexToUpdate = attackDiceRoll > defendDiceRoll
            ? hexToAttack
            : hexToAttackFrom
          // console.log(`HEX TO UPDATE IS ${hexToUpdate}`)

          let newUnits = hexToUpdate === hexToAttack
            ? --defendUnits
            : --attackUnits

          let update = ({ unit1: newUnits })
          // console.log(`NEW UNITS ARE ${newUnits}`)

          // if newUnits === 0, that means that defender lost
          // and attacker takes control of territory
          if (!newUnits) {
            // territory will get updated with attacking units - 1
            newUnits = attackUnits - 1
            // update `update` object with moving units & AI playerId
            update = ({ unit1: newUnits, playerId: currentPlayer })
            // console.log('update is', update)
            // attacking hex only has one unit now
            firebase.ref(`/boards/${boardId}/hexes/${hexToAttackFrom}`).update({ unit1: 1 })
              // .then(console.log('updated?'))

            // console.log('test1')
          }
          // if defender won, update attacking with -1 units
          // if attacker won but defender still has units,
          //   update defending with -1 units
          // if attacker won and defender has no units, will
          //  update defending with new units & playerId
          firebase.ref(`/boards/${boardId}/hexes/${hexToUpdate}`)
            .update(update)
        }
      } else {
        // console.log('no hexes to attack')
        firebase.ref(`boards/${boardId}/state`).update({ currentPhase: 'fortification' })
      }
    },

    fortify(board, id, playerOrder, allotmentPointsPerTurn, currentPlayer) {
      let bestOption = bestMove(board, id)
      if (bestOption) {
        let fromHex = bestOption[0]
        let toHex = bestOption[1]
        let startingHexUnits = board[fromHex].unit1
        let endingHexUnits = board[toHex].unit1
        let unitsToMove = Math.min(startingHexUnits - 1, 15 - endingHexUnits)
        let fromHexUnits = board[fromHex].unit1 - unitsToMove
        let toHexUnits = board[toHex].unit1 + unitsToMove
        firebase.ref(`boards/${boardId}/hexes`).update({ [fromHex]: fromHexUnits, [toHex]: toHexUnits })
          .then(() => {
            // console.log(`moved ${unitsToMove} from ${fromHex} to ${toHex}`)
            // firebase.ref(`boards/${boardId}/state`)
          })
        // console.log('FORTIFIED')
      } else {
        // console.log('No valid fortification moves available.')
      }
      changePhaseFunction('fortification', currentPlayer, playerOrder, allotmentPointsPerTurn, board, boardId)
    }
  }
}

let AIturnContainer = withRouter(connect(mapState, mapDispatch)(AIturn))
export default AIturnContainer

