import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBoard } from '../store';
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
    dispatch(setBoard(snap.val()))
  })
  return {}
}

const RoomContainer = connect(mapState, mapDispatch)(Room)

export default RoomContainer
