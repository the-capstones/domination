import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils, Pattern } from 'react-hexgrid';
import { connect } from 'react-redux';
import { hexagons, config, addColors, addIdToHexes, calcAllotmentPoints, getNeighbors, highlightNeighbors } from '../functions';
import { withRouter } from 'react-router-dom';
import { AllotmentGUI } from './';
import '../css/_board.scss';
import firebase from '../firebase'


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
                let randomNum = Math.floor(Math.random() * 12);
                if (randomNum < 10) randomNum = '0' + randomNum.toString();
                return (<Hexagon
                  key={i}
                  q={hex.q}
                  r={hex.r}
                  s={hex.s}
                  onClick={() => {
                    const isCurrentPlayer = user.username === currentPlayer;
                    isCurrentPlayer && selectHex(user, hexes, currentPlayer, hexId, selectedHex, currentPhase);
                    isCurrentPlayer && currentPhase === 'allotment' && renderAllotmentGUI(currentPhase, hexId, hexes, user, currentPlayer);
                    isCurrentPlayer && currentPhase === 'attack' && renderCombatGUI(user, currentPlayer, hexes, currentPhase, hexId, selectedHex);
                  }}
                  fill={`grass01`}
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
          <Pattern id="grass00" link="../assets/grass_00.png" />
          <Pattern id="grass01" link="../assets/grass_01.png" />
          <Pattern id="grass02" link="../assets/grass_02.png" />
          <Pattern id="grass03" link="../assets/grass_03.png" />
          <Pattern id="grass04" link="../assets/grass_04.png" />
          <Pattern id="grass05" link="../assets/grass_05.png" />
          <Pattern id="grass06" link="../assets/grass_06.png" />
          <Pattern id="grass07" link="../assets/grass_07.png" />
          <Pattern id="grass08" link="../assets/grass_08.png" />
          <Pattern id="grass09" link="../assets/grass_09.png" />
          <Pattern id="grass10" link="../assets/grass_10.png" />
          <Pattern id="grass11" link="../assets/grass_11.png" />
          <Pattern id="grass12" link="../assets/grass_12.png" />
        </HexGrid>
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
    currentPlayer: state.board.state.currentPlayer
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const { boardId } = ownProps;
  console.log('map dispatch has ran')

  return {
    renderAllotmentGUI(phase, selectedHexId, hexes, user, currentPlayer) {
      console.log('renderAllotmentGui has ran')
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
      console.log('renderCombatGUI has ran')
      const attackerNeighbors = getNeighbors(attackerHexId);
      const isValidMove = attackerNeighbors.includes(defenderHexId)
        && hexes[defenderHexId].playerId !== '';
      const isAttacker = user.username === currentPlayer;
      const isAttacking = attackerHexId && hexes[attackerHexId].playerId === currentPlayer && hexes[defenderHexId].playerId !== currentPlayer;
      const enoughUnits = hexes[attackerHexId].unit1 > 1;
      const enoughMoves = hexes[attackerHexId].movesLeft > 0;

      if (phase === 'attack'
        && enoughMoves
        && enoughUnits
        && isValidMove
        && isAttacker
        && isAttacking) {
        ownProps.history.push(`/boards/${boardId}/battle`);
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

        firebase.ref(`/boards/${boardId}/state`).update({ prevSelectedHex: oldHexId, selectedHex: newHexId })
        // firebase.ref(`/boards/${boardId}/state`).update({ selectedHex: newHexId })
      }
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Board));

