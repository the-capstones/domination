import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase'

import '../css/_channel-list.scss';

const ChannelList = (props) => {
  const { allBoards, joinGame } = props;
  console.log(allBoards);
  return (
    <div className="channel-list-wrapper">
      <div className="channel-list">

        {
          allBoards && Object.entries(allBoards).map((board, i) => {
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
                <button onClick={() => joinGame(boardId)}>Join Game</button>
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
  let boards;
  firebase.ref(`/boards`).on('value', snap => {
    boards = snap.val();
  });

  return {
    allBoards: boards,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    joinGame(boardId) {
      ownProps.history.push(`/boards/${boardId}`)
    },
  }
}

export default withRouter(connect(mapState, mapDispatch)(ChannelList));

/**
 * PROP TYPES
 */
ChannelList.propTypes = {

}
