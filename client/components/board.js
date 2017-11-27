import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase'
import { GameOver } from './';
import {
  hexagons,
  config,
  addColors,
  addIdToHexes,
  calcAllotmentPoints,
  getNeighbors,
  highlightNeighbors,
  highlightMovableNeighbors,
  changePhaseFunction
} from '../functions';

import '../css/_board.scss';

class Board extends Component {

  componentDidMount() {
    console.log('component did mount has ran')
    const { playerOrder, hexes, boardId } = this.props;
    addIdToHexes();
    addColors(playerOrder, hexes);
    calcAllotmentPoints(boardId, hexes);
  }

  componentDidUpdate() {
    console.log('component did update has ran')

    const { playerOrder, hexes } = this.props;
    addColors(playerOrder, hexes);
  }

  render() {
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };
    const {
      user,
      hexes,
      currentPhase,
      currentPlayer,
      playerOrder,
      renderCombatGUI,
      selectHex,
      selectedHex,
      allotmentPointsPerTurn,
      fortify,
      allotmentLeft,
      addUnit,
    } = this.props;

    return (
      <div className="board">
        <HexGrid width={config.width} height={config.height}>
          <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
            {
              hexagons.map((hex, i) => {
                const hexId = `${hex.q},${hex.r},${hex.s}`;
                const doesPlayerOwn = !!hexes[hexId].playerId.length;
                const hexUnits = hexes[hexId].unit1.toString();
                return (<Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  fill="pattern"
                  onClick={() => {
                    const isCurrentPlayer = user.username === currentPlayer;
                    isCurrentPlayer && selectHex(user, hexes, currentPlayer, hexId, selectedHex, currentPhase);
                    isCurrentPlayer && currentPhase === 'allotment'
                      && addUnit(user.username, hexId, hexes, allotmentLeft, currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, selectedHex);
                    isCurrentPlayer && currentPhase === 'attack' && renderCombatGUI(user, currentPlayer, hexes, currentPhase, hexId, selectedHex);
                    isCurrentPlayer && currentPhase === 'fortification' && fortify(user, currentPlayer, hexes, hexId, selectedHex, playerOrder, allotmentPointsPerTurn)
                  }}

                >
                  <div className="poly-id" id={hexId} />
                  <Text>
                    {doesPlayerOwn ? hexUnits : ''}
                  </Text>
                  {/*<Text>{HexUtils.getID(hex)}</Text>*/}
                </Hexagon>)
              })
            }
          </Layout>
          {/*<Pattern id="img1" link="favicon.ico" />*/ /*fill="img1"*/}
          <pattern id="Pattern" x="10" y="10" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="50" height="50" fill="skyblue" />
          </pattern>
        </HexGrid>
        {
          user
          && !playerOrder.includes(user.username)
          && <GameOver lost={true} />
        }
        {
          user
          && playerOrder.length === 1
          && playerOrder.includes(user.username)
          && <GameOver lost={false} />
        }
      </div>
    )
  }
}

const mapState = (state) => {
  console.log('map state has ran')
  return {
    user: state.user,
    currentPhase: state.board.state.currentPhase,
    selectedHex: state.board.state.selectedHex,
    prevSelectedHex: state.board.state.prevSelectedHex,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder,
    currentPlayer: state.board.state.currentPlayer,
    allotmentPointsPerTurn: state.board.state.allotmentPointsPerTurn,
    allotmentLeft: state.board.state.allotmentLeft,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { boardId } = ownProps;
  console.log('map dispatch has ran')

  return {
    renderCombatGUI(user, currentPlayer, hexes, phase, defenderHexId, attackerHexId) {
      console.log('renderCombatGUI has ran')
      const attackerNeighbors = getNeighbors(attackerHexId);
      const isValidMove = attackerNeighbors.includes(defenderHexId)
        && hexes[defenderHexId].playerId !== '';
      const isAttacker = user.username === currentPlayer;
      const isAttacking = attackerHexId && hexes[attackerHexId].playerId === currentPlayer && hexes[defenderHexId].playerId !== currentPlayer;
      const enoughUnits = hexes[attackerHexId] && hexes[attackerHexId].unit1 > 1;
      const enoughMoves = hexes[attackerHexId] && hexes[attackerHexId].movesLeft > 0;

      if (phase === 'attack'
        && enoughMoves
        && enoughUnits
        && isValidMove
        && isAttacker
        && isAttacking) {
        ownProps.history.push(`/boards/${boardId}/battle`);
      }
    },
    fortify(user, currentPlayer, hexes, newlySelectedHex, previouslySelectedHex, inputPlayerOrder, inputAllotmentPointsPerTurn) {
      console.log('fortify has ran')
      const startHexNeighbors = getNeighbors(previouslySelectedHex);
      const isValidMove = startHexNeighbors.includes(newlySelectedHex)
        && hexes[newlySelectedHex].playerId !== '';
      const isMover = user.username === currentPlayer;
      const isMovee = previouslySelectedHex && hexes[previouslySelectedHex].playerId === currentPlayer && hexes[newlySelectedHex].playerId === currentPlayer;
      const enoughUnits = hexes[previouslySelectedHex] && hexes[previouslySelectedHex].unit1 > 1;
      const enoughSpace = hexes[newlySelectedHex] && hexes[newlySelectedHex].unit1 < 15;
      const enoughMoves = hexes[previouslySelectedHex] && hexes[previouslySelectedHex].movesLeft > 0;

      if (enoughMoves
        && enoughUnits
        && enoughSpace
        && isValidMove
        && isMover
        && isMovee) {
        // figure out how many units are moving
        const startMoveUnits = hexes[previouslySelectedHex].unit1;
        const endMoveUnits = hexes[newlySelectedHex].unit1;
        const maxUnitsToMove = startMoveUnits - 1;
        const maxUnitsToFit = 15 - endMoveUnits
        const unitsToMove = Math.min(maxUnitsToFit, maxUnitsToMove)
        //update Firebase here with new unit totals
        const startHexId = previouslySelectedHex
        const endHexId = newlySelectedHex
        const startHexStats = hexes[previouslySelectedHex]
        const endHexStats = hexes[newlySelectedHex]
        const newStartHexObj = {
          [startHexId]: startHexStats
        };
        newStartHexObj[startHexId].unit1 -= unitsToMove;
        const newEndHexObj = {
          [endHexId]: endHexStats
        };
        newEndHexObj[endHexId].unit1 += unitsToMove;
        firebase.ref(`/boards/${boardId}/hexes`).update(newStartHexObj);
        firebase.ref(`/boards/${boardId}/hexes`).update(newEndHexObj);
        changePhaseFunction('fortification',
          currentPlayer,
          inputPlayerOrder,
          inputAllotmentPointsPerTurn,
          hexes,
          boardId)
      }
    },
    selectHex(user, hexes, currentPlayer, newHexId, oldHexId, phase) {
      console.log('selectHex has ran')

      const isCurrentPlayer = user.username === currentPlayer;
      const isNewHex = newHexId !== oldHexId;

      if (isCurrentPlayer && isNewHex) {
        const highlightedHexes = [...document.getElementsByClassName('highlight-select')];
        highlightedHexes.forEach(hex => hex.classList.remove('highlight-select'));

        const hexElement = document.getElementById(newHexId);
        hexElement.classList.add('highlight-select');

        if (phase === 'attack') {
          const highlightedEnemies = [...document.getElementsByClassName('highlight-attack')];
          highlightedEnemies.forEach(hex => hex.classList.remove('highlight-attack'));
          highlightNeighbors(newHexId, currentPlayer, hexes);
        }

        if (phase === 'fortification') {
          const highlightedFriendlies = [...document.getElementsByClassName('highlight-move')];
          highlightedFriendlies.forEach(hex => hex.classList.remove('highlight-move'));
          highlightMovableNeighbors(newHexId, currentPlayer, hexes);
        }

        firebase.ref(`/boards/${boardId}/state`).update({ prevSelectedHex: oldHexId, selectedHex: newHexId })
        // firebase.ref(`/boards/${boardId}/state`).update({ selectedHex: newHexId })
      }
    },
    addUnit(user, id, hexagons, inputAllotmentLeft, currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, selectedHex) {
      if (user !== currentPlayer || hexagons[id].unit1 >= 15) return;
      if (inputAllotmentLeft > 0) {
        inputAllotmentLeft -= 1;
        const updatedHexArr = Object.entries(hexagons).filter(hex => hex[0] === id);
        const hexId = updatedHexArr[0][0];
        const hexStats = updatedHexArr[0][1];
        const updatedHexObj = {
          [hexId]: Object.assign({}, hexStats),
        };
        updatedHexObj[hexId].unit1 += 1;
        firebase.ref(`/boards/${boardId}/hexes`).update(updatedHexObj);
        firebase.ref(`/boards/${boardId}/state`).update({ allotmentLeft: inputAllotmentLeft });
        if (inputAllotmentLeft === 0) {
          changePhaseFunction(currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, hexagons, boardId);
          // highlightNeighbors(selectedHex, currentPlayer, hexagons);
        }
      }
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Board));

