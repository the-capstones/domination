import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hexagons, config } from './gridGenerator';
import { AllotmentGUI, CombatRisk } from './';
import '../css/_board.scss';
import firebase from '../firebase'


class Board extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const polyIdDivs = [...document.getElementsByClassName('poly-id')];
    polyIdDivs.forEach(polyIdDiv => {
      const poly = polyIdDiv.parentNode.firstChild;
      poly.id = polyIdDiv.id;
      polyIdDiv.remove();
    });

    let players = ['', ...this.props.playerOrder];

    if (this.props.hexes) {
      Object.keys(this.props.hexes).forEach(id => {
        let hex = document.getElementById(id)

        switch (this.props.hexes[id].playerId) {
          case players[0]:
            return hex.classList.add('hex-fill-black');
          case players[1]:
            return hex.classList.add('hex-fill-red');
          case players[2]:
            return hex.classList.add('hex-fill-orange');
          case players[3]:
            return hex.classList.add('hex-fill-yellow');
          case players[4]:
            return hex.classList.add('hex-fill-green');
          case players[5]:
            return hex.classList.add('hex-fill-blue');
          default:
            break;
        }
      })
    }

  }

  render() {
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };
    const { hexes, selectedHex, prevSelectedHex, currentPhase, renderAllotmentGUI, renderCombatGUI, selectHex } = this.props;

    return (
      <div className="board">
        <CombatRisk />
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
                    this.props.renderCombatGUI(currentPhase, hexId, selectedHex, prevSelectedHex);
                    this.props.renderAllotmentGUI(currentPhase, hexId, selectedHex);
                    this.props.selectHex(hexId, selectedHex, currentPhase);
                  }}

                >
                  <div className="poly-id" id={hexId} />
                  <Text>
                    {doesPlayerOwn ? hexUnits : ''}
                  </Text>
                  {/*<Text>{HexUtils.getID(hex)}</Text>*/}
                  <foreignObject id={`${hexId}-algui`}>
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
    currentPhase: state.board.state.currentPhase,
    selectedHex: state.board.state.selectedHex,
    prevSelectedHex: state.board.state.prevSelectedHex,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder,
    currentPlayer: state.board.state.currentPlayer
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    renderAllotmentGUI(phase, id, selectedHexId) {
      if (phase === 'allotment') {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${id}-algui`);
        gui.classList.add('show');
      }
    },
    renderCombatGUI(phase, id, selectedHexId, prevSelectedHex) {
      if (phase === 'attack' && selectedHexId && prevSelectedHex) {
        const combatGui = document.getElementById('combat-wrapper');
        combatGui.classList.remove('hidden');
      }
    },
    selectHex(newHexId, oldHexId, phase) {
      if (newHexId !== oldHexId) {
        firebase.ref(`/boards/${ownProps.boardId}/state`).update({ prevSelectedHex: oldHexId })
        firebase.ref(`/boards/${ownProps.boardId}/state`).update({ selectedHex: newHexId })
      }
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Board);

