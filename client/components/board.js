import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { hexagons, config, addColors, addIdToHexes, calcAllotmentPoints, getNeighbors } from '../functions';
import { withRouter } from 'react-router-dom';
import { AllotmentGUI } from './';
import '../css/_board.scss';
import firebase from '../firebase'


class Board extends Component {

  componentDidMount() {
    const { playerOrder, hexes, boardId } = this.props;
    addIdToHexes();
    addColors(playerOrder, hexes);
    calcAllotmentPoints(boardId, hexes);
  }

  componentDidUpdate() {
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
      renderAllotmentGUI,
      renderCombatGUI,
      selectHex,
      selectedHex,
      prevSelectedHex,
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
                  onClick={() => {
                    selectHex(user, currentPlayer, hexId, selectedHex, currentPhase);
                    renderAllotmentGUI(currentPhase, hexId, hexes, user, currentPlayer);
                    renderCombatGUI(user, currentPlayer, hexes, currentPhase, hexId, selectedHex);
                  }}

                >
                  <div className="poly-id" id={hexId} />
                  <Text>
                    {doesPlayerOwn ? hexUnits : ''}
                  </Text>
                  {/*<Text>{HexUtils.getID(hex)}</Text>*/}
                  <foreignObject className="allotment-guis" id={`${hexId}-algui`}>
                    <AllotmentGUI hexId={hexId} />
                  </foreignObject>
                </Hexagon>)
              })
            }
          </Layout>
          {/*<Pattern id="img1" link="favicon.ico" />*/ /*fill="img1"*/}
        </HexGrid>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    currentPhase: state.board.state.currentPhase,
    selectedHex: state.board.state.selectedHex,
    prevSelectedHex: state.board.state.prevSelectedHex,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder,
    currentPlayer: state.board.state.currentPlayer
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { boardId } = ownProps;

  return {
    renderAllotmentGUI(phase, selectedHexId, hexes, user, currentPlayer) {
      const allGuis = document.getElementsByClassName('allotment-guis');
      [...allGuis].forEach(gui => gui.classList.remove('show'));
      const isOwner = hexes[selectedHexId].playerId === user.username;
      const isCurrentPlayer = user.username === currentPlayer;
      if (phase === 'allotment' && isOwner && isCurrentPlayer) {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${selectedHexId}-algui`);
        gui.classList.add('show');
      }
    },
    renderCombatGUI(user, currentPlayer, hexes, phase, defenderHexId, attackerHexId) {
      const attackerNeighbors = getNeighbors(attackerHexId);
      const isValidMove = attackerNeighbors.includes(defenderHexId);
      const isAttacker = user.username === currentPlayer;
      const isAttacking = attackerHexId && hexes[attackerHexId].playerId === currentPlayer && hexes[defenderHexId].playerId !== currentPlayer;
      const enoughUnits = hexes[attackerHexId].unit1 > 1;

      if (phase === 'attack' && enoughUnits && isValidMove && isAttacker && isAttacking) {
        ownProps.history.push(`/boards/${boardId}/battle`);
      }
    },
    selectHex(user, currentPlayer, newHexId, oldHexId, phase) {
      const isCurrentPlayer = user.username === currentPlayer;
      const isNewHex = newHexId !== oldHexId;

      if (isCurrentPlayer && isNewHex) {
        const hexElement = document.getElementById(newHexId);
        oldHexId && document.getElementById(oldHexId).classList.remove('highlight-select');
        hexElement.classList.add('highlight-select');

        firebase.ref(`/boards/${boardId}/state`).update({ prevSelectedHex: oldHexId })
        firebase.ref(`/boards/${boardId}/state`).update({ selectedHex: newHexId })
      }
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Board));

