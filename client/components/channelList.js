import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setInGame, getBoards } from '../store';
import firebase from '../firebase'

import '../css/_channel-list.scss';

const ChannelList = (props) => {
  const { allBoards, joinGame, user } = props;

  return (
    <div className="channel-list-wrapper">
      <div className="channel-list">

        {
          allBoards && Object.entries(allBoards)
            .filter(board => {
              return board[1].state.status === 'waiting'
                && board[1].maxPlayers > board[1].state.playerOrder.length
            })
            .map((board, i) => {
              const boardId = board[0];
              const boardState = board[1];
              const { boardName, maxPlayers } = boardState;
              const currentPlayers = boardState.state.playerOrder;
              const amountOfCurrentPlayers = currentPlayers && Object.keys(currentPlayers).length;

              return (
                <div key={i} className="channel">
                  <p>{boardId}</p>
                  <p>{boardName}</p>
                  <p>players {amountOfCurrentPlayers}/{maxPlayers}</p>
                  <button onClick={() => joinGame(boardId, user)}>Join Game</button>
                </div>
              )
            })
        }

      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {


  return {
    user: state.user,
    allBoards: state.boardsList,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  firebase.ref(`/boards`).on('value', snap => {
    dispatch(getBoards(snap.val()))
  });
  return {
    joinGame(boardId, user) {
      const { username } = user;
      let board;
      firebase.ref(`/boards/${boardId}`).on('value', snap => {
        board = snap.val();
      });

      const playerOrder = board.state.playerOrder.slice();
      const alreadyInGame = playerOrder.includes(username);
      if (!alreadyInGame && board.maxPlayers > playerOrder.length) {
        playerOrder.push(username)
        firebase.ref(`/boards/${boardId}/state`).update({ playerOrder });
        ownProps.history.push(`/boards/${boardId}`)
      }
      dispatch(setInGame(true));
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelList));

/**
 * PROP TYPES
 */
ChannelList.propTypes = {

}
