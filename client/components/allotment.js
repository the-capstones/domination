import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase'

import '../css/_allotment-gui.scss';

const AllotmentGUI = (props) => {
  const { allotmentLeft, hexId, addUnit, hexagons } = props;

  return (
    <div className="allotment-gui-wrapper">

      <div className='allotment'>
        <button onClick={() => addUnit(hexId, hexagons, allotmentLeft)}>
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
        <span className='muted'>{allotmentLeft}</span>
        <span> {allotmentLeft > 1 || allotmentLeft === 0 ? 'units left' : 'unit left'}</span>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    allotmentLeft: state.board.state.allotmentLeft,
    hexagons: state.board.hexes,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;
  return {
    addUnit(id, hexagons, allotmentLeft) {
      if (allotmentLeft > 0) {
        allotmentLeft -= 1;
        const updatedHexArr = Object.entries(hexagons).filter(hex => hex[0] === id );
        const hexId = updatedHexArr[0][0];
        const hexStats = updatedHexArr[0][1];
        const updatedHexObj = {
          [hexId]: Object.assign({}, hexStats),
        };
        updatedHexObj[hexId].unit1 += 1;
        firebase.ref(`/boards/${boardId}/hexes`).update(updatedHexObj);
        firebase.ref(`/boards/${boardId}/state`).update({ allotmentLeft });
      }
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllotmentGUI));

/**
 * PROP TYPES
 */
AllotmentGUI.propTypes = {

}
