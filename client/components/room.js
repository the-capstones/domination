import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setBoard } from '../store';
import firebase from '../firebase';
import WaitingRoom from './waiting-room';
import Board from './board';

import '../css/_room.scss';

export function Room(props) {
  const { board } = props
  const status = board.state ? board.state.status : 'loading'
  return (
    <div className="room-wrapper">
      {board.state &&
        ( <div><h1>Now in room: {board.boardName}</h1></div> )
      }
      {status === 'waiting' &&
        (
          <WaitingRoom />
        )
      }
      {status === 'playing' &&
        (
          <Board />
        )
      }
    </div>
  )
}

const mapState = state => ({ board: state.board, user: state.user })

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId
  firebase.ref(`/boards/${boardId}`).once('value', snap => {
    dispatch(setBoard(snap.val()))
  })
  return {}
}

const RoomContainer = connect(mapState, mapDispatch)(Room)

export default RoomContainer
