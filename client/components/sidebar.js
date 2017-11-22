import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, setInGame } from '../store';
import { calcAllotmentPoints, getCurrentPoints } from '../functions';
import firebase from '../firebase'


import '../css/_sidebar.scss';

const Sidebar = (props) => {

  const {
    isLoggedIn,
    handleClick,
    inGame,
    status,
    hexagons,
    user,
    currentPhase,
    currentPlayer,
    changePhase,
    playerOrder,
    allotmentPointsPerTurn,
    leaveGame,
  } = props;

  const colors = ['#b3482e', '#6f9bc4', '#d5a149', '#83ada0', '#c7723d']
  const numOfPlayers = playerOrder.length;

  return (
    <div className="sidebar-wrapper">
      <h1>DOMINATION</h1>

      <nav className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          {
            isLoggedIn
              ? <div>
                <Link to="/">Home</Link>
                <a href="#" onClick={handleClick}>Logout</a>
                <Link to="/rules">Rules</Link>
              </div>
              : <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/rules">Rules</Link>
              </div>
          }
        </div>
      </nav>

      {!inGame && isLoggedIn && (<div>
        <div className="home-menu">
          <Link to="/newGame">New Game</Link>
          <Link to="/channels">Join Game</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>)
      }
      {props.match.params.boardId && !playerOrder.includes(user) &&
        (<h1>SPECTATOR MODE</h1>)}
      {props.match.params.boardId
        && (<div>
          <div className="avatar">
            <img src="../assets/wizard-avatar.jpg" />
          </div>

          <div className="players">
            <table>
              <tbody>
                <tr>
                  <th><i className="fa fa-pie-chart" aria-hidden="true"></i>
                  </th>
                  <th>Username</th>
                </tr>
                { /*<i className="fa fa-arrow-right" aria-hidden="true"></i>*/
                  playerOrder.map((player, i) => (
                    <tr key={i}>
                      <td className="playerColorSidebar" style={{ background: colors[i] }}></td>
                      <td>{player}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>)
      }

      {inGame && status !== 'waiting' && currentPlayer === user
        && (
          <div>
            <button className="phase-btn" onClick={() => changePhase(currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, hexagons)}>
              {
                currentPhase === 'allotment' ? 'Start Attack Phase' : 'End Turn'
              }
            </button>
          </div>
        )
      }

      {inGame && status !== 'waiting' && currentPlayer === user
        && (
          <div className="leave-game-container">
            <button onClick={leaveGame}>Leave Game</button>
          </div>
        )
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  const isBoardLoaded = Object.keys(state.board).length > 0;

  return {
    user: state.user.username,
    isLoggedIn: !!state.user.id,
    hexagons: state.board.hexes,
    inGame: state.inGame,
    status: isBoardLoaded && state.board.state.status,
    currentPlayer: isBoardLoaded && state.board.state.currentPlayer || '',
    currentPhase: isBoardLoaded && state.board.state.currentPhase || '',
    playerOrder: isBoardLoaded && state.board.state.playerOrder || [],
    allotmentPointsPerTurn: isBoardLoaded && state.board.state.allotmentPointsPerTurn,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    handleClick() {
      dispatch(logout())
    },
    leaveGame() {
      dispatch(setInGame(false));
      ownProps.history.push('/');
    },
    changePhase(
      currentPhase,
      currentPlayer,
      playerOrder,
      allotmentPointsPerTurn,
      hexagons
    ) {
      if (currentPhase === 'allotment') {
        firebase.ref(`/boards/${boardId}/state`).update({ currentPhase: 'attack' });
      }
      else if (currentPhase === 'fortification' || currentPhase === 'attack') {
        const currIdx = playerOrder.indexOf(currentPlayer);
        let nextIdx;

        if (currIdx === playerOrder.length - 1) {
          nextIdx = 0;
        }
        else {
          nextIdx = currIdx + 1;
        }
        const nextPlayer = playerOrder[nextIdx];
        calcAllotmentPoints(boardId, hexagons);
        const currentAllotment = getCurrentPoints(allotmentPointsPerTurn, nextPlayer);
        firebase.ref(`/boards/${boardId}/state`).update({ currentPlayer: nextPlayer });
        firebase.ref(`/boards/${boardId}/state`).update({ allotmentLeft: currentAllotment });
        firebase.ref(`/boards/${boardId}/state`).update({ currentPhase: 'allotment' });
      }
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Sidebar));

/**
 * PROP TYPES
 */
Sidebar.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
