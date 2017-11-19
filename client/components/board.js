import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AllotmentGUI } from './';
import store, { setConfig, setHexagons, setSelectedHex, initializeBoard } from '../store';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import configs from '../configurations';
import firebase from '../firebase';

import '../css/_board.scss';


class Board extends Component {
  constructor(props) {
    super(props);
    const config = configs['rectangle'];
    const generator = GridGenerator.getGenerator(config.map);
    const hexagons = generator.apply(this, config.mapProps);
    hexagons.forEach(hex => {
      hex.id = `${hex.q},${hex.r},${hex.s}`;
      if (!hex.owner) hex.owner = '';
      if (!hex.moves) hex.moves = 0;
      if (!hex.units) hex.units = 0;
    });
    this.state = { hexagons, config };
  }

  componentDidMount() {
    const { hexagons, config } = this.state;
    const { boardName, maxPlayers } = this.props;
    this.props.initializeBoard(hexagons, boardName, maxPlayers)
    // store.dispatch(setHexagons(hexagons));
    store.dispatch(setConfig(config));

    // adds id's of coordinates to the polygon from a dummy div because you can't add it directly then deletes dummy div from dom
    const polyIdDivs = [...document.getElementsByClassName('poly-id')];
    polyIdDivs.forEach(polyIdDiv => {
      const poly = polyIdDiv.parentNode.firstChild;
      poly.id = polyIdDiv.id;
      polyIdDiv.remove();
    });

    this.divvySpaces()
  }

  divvySpaces() {
    //MOCK PLAYERS - DELETE THIS WHEN WE SET PLAYERS ON THE STATE
    this.props.players.push('Player1', 'Player2', 'Player3')
    //THIS FUNCTION ALREADY GETS THE PLAYERS FROM THE STATE, BUT THERE AREN"T PLAYERS ON THE STATE YET

    let numPlayerSpaces;
    let numPlayers = this.props.players.length;
    let numVoidSpaces = Math.floor(this.state.hexagons.length / 10) * 2;
    let numAllotSpaces = this.state.hexagons.length - numVoidSpaces;

    if (numPlayers >= 2) {
      if (numAllotSpaces % numPlayers !== 0) {
        let numExtra = numAllotSpaces % numPlayers;
        numVoidSpaces += numExtra;
        numAllotSpaces -= numExtra;
      }

      numPlayerSpaces = numAllotSpaces / numPlayers;

      console.log('Spaces/Player', numPlayerSpaces)
      console.log('VOID', numVoidSpaces)

      let numRed = numPlayerSpaces;
      let numOrange = numPlayerSpaces;
      let numYellow = numPlayerSpaces;
      let numGreen = numPlayerSpaces;
      let numBlue = numPlayerSpaces;

      let assignmentColors = [
        {color: 'black', amount: numVoidSpaces},
        {color: 'red', amount: numRed},
        {color: 'orange', amount: numOrange},
        {color: 'yellow', amount: numYellow},
        {color: 'green', amount: numGreen},
        {color: 'blue', amount: numBlue}]

      this.state.hexagons.forEach(hex => {
        hex = document.getElementById(hex.id)
        while (!hex.classList[0]) {
          let assign = Math.floor(Math.random() * (numPlayers + 1));
          if (assignmentColors[assign].amount) {
            assignmentColors[assign].amount--
            switch (assignmentColors[assign].color) {
              case 'black':
                return hex.classList.add('hex-fill-black');
              case 'red':
                return hex.classList.add('hex-fill-red');
              case 'orange':
                return hex.classList.add('hex-fill-orange');
              case 'yellow':
                return hex.classList.add('hex-fill-yellow');
              case 'green':
                return hex.classList.add('hex-fill-green');
              case 'blue':
                return hex.classList.add('hex-fill-blue');
              default:
                break;
            }
          }
        }
      })
    }
  }

  render() {
    const { hexagons, config } = this.state;
    const { selectedHex, currentPhase, renderAllotmentGUI, selectHex } = this.props;
    const layout = config.layout;
    const size = { x: layout.width, y: layout.height };

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
                    renderAllotmentGUI(currentPhase, hexId, selectedHex);
                    selectHex(hexId);
                  }}
                >
                  <div className="poly-id" id={hexId}></div>
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

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    hexagons: state.board.hexagons,
    config: state.board.config,
<<<<<<< HEAD
    players: state.board.state.playerOrder,
=======
    currentPhase: state.board.state.currentPhase,
    selectedHex: state.board.state.selectedHex,
>>>>>>> master
    boardName: state.board.boardName,
    maxPlayers: state.board.maxPlayers
  }
}

const mapDispatch = (dispatch) => {
  //THIS IS WHERE YOU ADD EVENT LISTENERS FOR FIREBASE (CHILD_ADDED ETC)
  //EG watchGuestsAddedEvent(dispatch) [need dispatch]
  return {
    initializeBoard(hexagons, boardName, maxPlayers) {
      dispatch(initializeBoard(hexagons, boardName, maxPlayers))
    },
    renderAllotmentGUI(phase, id, selectedHexId) {
      if (phase === 'allotment') {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${id}-algui`);
        gui.classList.add('show');
      }
    },
    selectHex(id) {
      dispatch(setSelectedHex(id));
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Board);

/**
 * PROP TYPES
 */
Board.propTypes = {

}

