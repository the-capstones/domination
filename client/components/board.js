import React, { Component } from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hexagons, config } from './gridGenerator';
import { AllotmentGUI } from './';
import '../css/_board.scss';
import firebase from '../firebase'


class Board extends Component {
  constructor(props){
    super(props)

  }

  componentDidMount() {
    const polyIdDivs = [...document.getElementsByClassName('poly-id')];
    polyIdDivs.forEach(polyIdDiv => {
      const poly = polyIdDiv.parentNode.firstChild;
      poly.id = polyIdDiv.id;
      polyIdDiv.remove();
    });

    let players = ['null', ...this.props.playerOrder];

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

  render () {
  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };
  const { selectedHex, currentPhase, renderAllotmentGUI, selectHex, hexes, userId } = this.props;

  return (
    <div className="board">
      <HexGrid width={config.width} height={config.height}>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {
            hexagons.map((hex, i) => {
              const hexId = `${hex.q},${hex.r},${hex.s}`;
              return (<Hexagon
                key={i}
                q={hex.q}
                r={hex.r}
                s={hex.s}
                onClick={() => {
                  this.props.renderAllotmentGUI(currentPhase, hexId, selectedHex, hexes, userId);
                  this.props.selectHex(hexId);
                }}

                >
                <div className="poly-id" id={hexId} />
                <Text>{HexUtils.getID(hex)}</Text>
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
      hexes: state.board.hexes,
      playerOrder: state.board.state.playerOrder,
      userId: state.user.id
    }
  }

const mapDispatch = (dispatch, ownProps) => {
  return {
    renderAllotmentGUI(phase, id, selectedHexId, hexes, user) {
      if (phase === 'allotment') {
        if (hexes[selectedHexId].playerId === user) {
          const selectedHex = document.getElementById(`${selectedHexId}-algui`);
          selectedHexId && selectedHex.classList.remove('show');
          const gui = document.getElementById(`${id}-algui`);
          gui.classList.add('show');
        }
      }
    },
    selectHex(id) {
      firebase.ref(`/boards/${ownProps.boardId}/state`).update({selectedHex: id})
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Board);

