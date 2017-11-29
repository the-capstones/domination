'use strict'
/* eslint "guard-for-in": 0 */
/* eslint "no-loop-func": 0 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'
import { attackMatrix } from '../../artificial-intelligence/attackMatrixCreator'
import { nextAllotment } from '../../artificial-intelligence/allotmentFunction'
import battleMatrix from '../../artificial-intelligence/battleMatrix'
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
  let hexesAllotedTo = []

  return {

    allot(allotment, board, id) {
      if (allotment) {
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
      let minChanceToWin = 0.40, hexToAttack = '', hexToAttackFrom = ''
      let playerAttackMatrix = attackMatrix(board, id)

      for (const playableHex in playerAttackMatrix) {
        playerAttackMatrix[playableHex].forEach(attackableHex => {
          let attackUnits = board[playableHex].unit1 - 1
          let defendUnits = board[attackableHex].unit1
          console.log(`${attackUnits} VS ${defendUnits}`)
          let chanceToWin = battleMatrix[attackUnits][defendUnits].ChanceToWin
          console.log('chanceToWin:', chanceToWin)

          if (chanceToWin >= minChanceToWin) {
            minChanceToWin = chanceToWin
            hexToAttack = attackableHex
            hexToAttackFrom = playableHex
          }
        })
      }

      if (hexToAttack) {
        while (board[hexToAttackFrom].unit1 > 1 && board[hexToAttack].unit1 > 0 && board[hexToAttack].playerId !== 'Zero') {
          console.log(board[hexToAttackFrom].unit1)
          console.log(board[hexToAttack].unit1)
          let attackDiceRoll = rollDiceAndReturnMax(3)
          let defendDiceRoll = rollDiceAndReturnMax(2)
          console.log(`${hexToAttackFrom} ATTACKING ~~~~~~~~> ${hexToAttack}`)
          console.log(`attacker rolled ${attackDiceRoll}`)
          console.log(`defender rolled ${defendDiceRoll}`)

          let hexToUpdate = attackDiceRoll > defendDiceRoll
            ? hexToAttack
            : hexToAttackFrom
          console.log(`HEX TO UPDATE IS ${hexToUpdate}`)

          let newUnits = board[hexToUpdate].unit1 - 1
          let update = ({ unit1: newUnits })
          console.log(`NEW UNITS ARE ${newUnits}`)

          // if newUnits === 0, that means that defender lost
          // and attacker takes control of territory
          if (!newUnits) {
            // territory will get updated with attacking units - 1
            newUnits = board[hexToAttackFrom].unit1 - 1
            // update `update` object with moving units & AI playerId
            update = ({ unit1: newUnits, playerId: 'Zero' })
            console.log('update is', update)
            // attacking hex only has one unit now
            firebase.ref(`/boards/${boardId}/hexes/${hexToAttackFrom}`).update({ unit1: 1 })
            .then(console.log('updated?'))

            console.log('test1')
          }
          // if defender won, update attacking with -1 units
          // if attacker won but defender still has units,
          //   update defending with -1 units
          // if attacker won and defender has no units, will
          //  update defending with new units & playerId
          firebase.ref(`/boards/${boardId}/hexes/${hexToUpdate}`)
            .update(update)
            .then(() => {
              console.log(`${hexToAttack} now belongs to attacker!`)
              console.log(`${hexToAttackFrom} now has ${board[hexToAttackFrom].unit1} units!`)
            })
          console.log('test2')
        }
      } else {
        console.log('no hexes to attack')
        firebase.ref(`boards/${boardId}/state`)
          .update({ currentPhase: 'fortification' })
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

