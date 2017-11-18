import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store, { setConfig, setHexagons, initializeBoard, setBoard } from '../store';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import configs from '../configurations';
import firebase from '../firebase';

import '../css/_board.scss';

export function Room() {
  return (
    <p>Now in Room</p>
  )
}

const mapState = state => ({ board: state.board })

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId
  firebase.ref(`/boards/${boardId}`).once('value', snap => {
    console.log('SNAP IS', snap.exists())
    // dispatch(setBoard(snap.val()))
  })
  firebase.ref(`/boards/${boardId}`).on('child_changed', snap => {
    console.log('SNAP IS', snap.exists())
    // dispatch(setBoard(snap.val()))
  })
  return {}
}

const RoomContainer = connect(mapState, mapDispatch)(Room)

export default RoomContainer

// class Board extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { hexagons, config };
//   }

//   componentDidMount() {
//     const { hexagons, config } = this.state;
//     const { boardName, maxPlayers } = this.props;
//     this.props.initializeBoard(hexagons, boardName, maxPlayers)
//     // store.dispatch(setHexagons(hexagons));
//     store.dispatch(setConfig(config));

//     // adds id's of coordinates to the polygon from a dummy div because you can't add it directly then deletes dummy div from dom
//     const polyIdDivs = [...document.getElementsByClassName('poly-id')];
//     polyIdDivs.forEach(polyIdDiv => {
//       const poly = polyIdDiv.parentNode.firstChild;
//       poly.id = polyIdDiv.id;
//       polyIdDiv.remove();
//     });
//   }

//   render() {
//     const { hexagons, config } = this.state;
//     const layout = config.layout;
//     const size = { x: layout.width, y: layout.height };

//     return (
//       <div className="board">
//         <HexGrid width={config.width} height={config.height}>
//           <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
//             {
//               hexagons.map((hex, i) => (
//                 <Hexagon
//                   key={i}
//                   q={hex.q}
//                   r={hex.r}
//                   s={hex.s}
//                 >
//                   <div className="poly-id" id={`${hex.q},${hex.r},${hex.s}`}></div>
//                   <Text>{HexUtils.getID(hex)}</Text>
//                 </Hexagon>
//               ))
//             }
//           </Layout>
//           {/*<Pattern id="img1" link="favicon.ico" />*/ /*fill="img1"*/}
//         </HexGrid>
//       </div>
//     )
//   }
// }

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     hexagons: state.board.hexagons,
//     config: state.board.config,
//     boardName: state.board.boardName,
//     maxPlayers: state.board.maxPlayers
//   }
// }

// const mapDispatch = (dispatch) => {
//   //THIS IS WHERE YOU ADD EVENT LISTENERS FOR FIREBASE (CHILD_ADDED ETC)
//   //EG watchGuestsAddedEvent(dispatch) [need dispatch]
//   return {
//     handleClick() {
//       dispatch(logout())
//     },
//     initializeBoard(hexagons, boardName, maxPlayers) {
//       dispatch(initializeBoard(hexagons, boardName, maxPlayers))
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default connect(mapState, mapDispatch)(Board);

// /**
//  * PROP TYPES
//  */
// Board.propTypes = {

// }

