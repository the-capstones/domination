'use strict'
/* eslint "guard-for-in": 0 */
/* eslint "no-loop-func": 0 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'
import { attackMatrix } from '../../artificial-intelligence/attackMatrixCreator'
import { nextAllotment } from '../../artificial-intelligence/allotmentFunction'
import { battleMatrix } from '../../artificial-intelligence/battleMatrix'
import { rollDiceAndReturnMax } from '../../artificial-intelligence/genetic-algorithms/play'


function AIturn(props) {
  const { phase, id, board, allotment, allot, attack } = props
  return (
    <div id="ai-turn">
      <h1> Zero's turn!</h1>
      {phase === 'allotment' && allot(allotment, board, id)}
      {phase === 'attack' && attack(board, id)}
    </div>
  )
}

const mapState = state => {
  return {
    board: state.board.hexes,
    id: state.board.state.currentPlayer,
    phase: state.board.state.currentPhase,
    // playerHexes: Object.keys(state.board.hexes).filter(hex => state.board[hex].playerId === id),
    allotment: state.board.state.allotmentLeft

  }
}

const mapDispatch = (dispatch, ownProps) => {
  let boardId = ownProps.match.params.boardId

  return {

    allot(allotment, board, id) {
      if (allotment) {
        let hexesAllotedTo = []
        let hexToAllotTo = nextAllotment(board, id)

        if (hexToAllotTo) {
          let newUnits = board[hexToAllotTo].unit1 + 1
          hexesAllotedTo.push(hexToAllotTo)
          allotment--
          console.log(`allotting to ${hexToAllotTo}`)
          console.log(`remaining allotment is ${allotment}`)
          firebase.ref(`/boards/${boardId}/state`)
            .update({ allotmentLeft: allotment })
            .then(
              firebase.ref(`/boards/${boardId}/hexes/${hexToAllotTo}`)
                .update({ unit1: newUnits }))
            .then(() => {
              console.log('ALLOTED UNITS TO', hexesAllotedTo)
              return (
                <span>Alloted units to {hexesAllotedTo}</span>
              )
            })
        } else {
          return null
        }
      } else {
        firebase.ref(`boards/${boardId}/state`)
          .update({ currentPhase: 'attack' })
      }
    },

    attack(board, id) {
      console.log('ATTACK')
      let minChanceToWin = 0.51
      let hexToAttack = ''
      let hexToAttackFrom = ''
      let playerAttackMatrix = attackMatrix(board, id)

      for (const playableHex in playerAttackMatrix) {
        playerAttackMatrix[playableHex].forEach(attackableHex => {
          let attackUnits = board[playableHex].unit1
          let defendUnits = board[attackableHex].unit1
          let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin

          if (chanceToWin >= minChanceToWin) {
            minChanceToWin = chanceToWin
            hexToAttack = attackableHex
            hexToAttackFrom = playableHex
          }
        })
      }

      if (hexToAttack) {
        let defenderId = board[hexToAttack].playerId

        while (board[hexToAttackFrom].unit1 > 1 && board[hexToAttack].unit1 > 0) {
          let attackDiceRoll = rollDiceAndReturnMax(3)
          let defendDiceRoll = rollDiceAndReturnMax(2)
          console.log(`${hexToAttackFrom} ATTACKING ~~~~~~~~> ${hexToAttack}`)
          console.log(`attacker rolled ${attackDiceRoll}`)
          console.log(`defender rolled ${defendDiceRoll}`)

          // let updatedHex = attackDiceRoll > defendDiceRoll
          //   ? {[hexToAttack]: {unit1: board[hexToAttack].unit1 - 1}}
          //   : {[hexToAttackFrom]: {unit1: board[hexToAttackFrom].unit1 - 1}}

          let hexToUpdate = attackDiceRoll > defendDiceRoll
            ? hexToAttack
            : hexToAttackFrom

          firebase.ref(`/boards/${boardId}/hexes/${hexToUpdate}`)
            .update({unit1: board[hexToUpdate].unit1 - 1})
            .then(() => {
              if (board[hexToAttackFrom].unit1 === 1) return

            })


          if (!board[hexToAttack].unit1) {

            board[hexToAttack].playerId = board[hexToAttackFrom].playerId
            console.log(`${hexToAttack} now belongs to attacker!`)

            let unitsToMove = board[hexToAttackFrom].unit1 - 1
            board[hexToAttackFrom].unit1 -= unitsToMove
            board[hexToAttack].unit1 += unitsToMove
            return
          }
        }
      }
    },

  }
}

// let hexesOwned = Object.keys(playerHexes).length;
// let allotment = Math.max(Math.floor(hexesOwned / TERRITORIES_PER_UNIT_ALLOTTED), 3)

// // battle phase
// let inBattle = true
// console.log('************* BEGINNING BATTLE *************')

// while (inBattle) {
//   let [hexToAttackFrom, hexToAttack] = chooseAttack(board, player)

//   if (hexToAttack) {
//     let defenderId = board[hexToAttack].playerId
//     battle(hexToAttackFrom, hexToAttack, board)

//     console.log('ATTACKED PLAYER', defenderId)
//     let defenderTerritories = hasTerritories(board, defenderId)
//     if (!defenderTerritories) {
//       console.log(`PLAYER ${defenderId} LOST`)
//       let playerLost = players.find(player => player.id === defenderId)
//       playerLost.rank = gameRank;
//       gameRank--
//     }
//   }

//   if (!hexToAttack) {
//     console.log('NO ADVANTAGEOUS ATTACK MOVES TO MAKE')
//     inBattle = false
//   }
// }

// // fortification phase
// console.log('**************** FORTIFYING ****************')
// fortify(board, id)
//         }


let AIturnContainer = withRouter(connect(mapState, mapDispatch)(AIturn))

export default AIturnContainer

