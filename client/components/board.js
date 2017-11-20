import React from 'react';
import { HexGrid, Layout, Hexagon, Text, HexUtils } from 'react-hexgrid';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hexagons, config } from './gridGenerator';
import { AllotmentGUI } from './allotment';
import '../css/_board.scss';
import firebase from '../firebase'


export const Board = (props) => {

  const polyIdDivs = [...document.getElementsByClassName('poly-id')];
  polyIdDivs.forEach(polyIdDiv => {
    const poly = polyIdDiv.parentNode.firstChild;
    poly.id = polyIdDiv.id;
    polyIdDiv.remove();
  });

  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };
  const { selectedHex, currentPhase, renderAllotmentGUI, selectHex } = props;


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
                // onClick={() => {
                //   props.renderAllotmentGUI(currentPhase, hexId, selectedHex);
                //   props.selectHex(hexId);
                // }}

                >
                <div className="poly-id" id={hexId} />
                <Text>{HexUtils.getID(hex)}</Text>
                <foreignObject id={`${hexId}-algui`}>

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

  const mapState = (state) => {
    return {
      currentPhase: state.board.state.currentPhase,
      selectedHex: state.board.state.selectedHex
    }
  }

const mapDispatch = (dispatch, ownProps) => {
  console.log('OWNPROPSARE', ownProps)
  // const boardId = ownProps.match.params.boardId
  return {
    renderAllotmentGUI(phase, id, selectedHexId) {
      if (phase.hasOwnProperty('allotment')) {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${id}-algui`);
        gui.classList.add('show');
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

