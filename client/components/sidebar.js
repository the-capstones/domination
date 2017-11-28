import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, setInGame } from '../store';
import { changePhaseFunction, attackMatrix } from '../functions';
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
    allotmentLeft,
    attacksLeft
  } = props;
  const boardId = props.match.params.boardId;

  const colors = ['#b3482e', '#6f9bc4', '#d5a149', '#83ada0', '#c7723d']
  const numOfPlayers = playerOrder.length;
  const icons = {
    'allotment': 'knight',
    'attack': 'swords',
    'fortification': 'castle'
  };

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
                <Link to="/credits">Credits</Link>
              </div>
              : <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/rules">Rules</Link>
              </div>
          }
        </div>
      </nav>

      {!boardId && isLoggedIn && (<div>
        <div className="home-menu">
          <Link to="/newGame">New Game</Link>
          <Link to="/channels">Join Game</Link>
        </div>
      </div>)
      }

      {boardId && !playerOrder.includes(user) &&
        (<h1>SPECTATOR MODE</h1>)}
      {
        //logic to switch phases if the player can no longer attack
        boardId
        && status !== 'waiting'
        && currentPlayer === user
        && currentPhase === 'attack'
        && attacksLeft === 0
        && changePhase(currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, hexagons, boardId)
      }
      {boardId
        && (<div>
          <div className="current-state-info">
            {/*<h1>Current Player</h1><br /><p>{currentPlayer}</p>
        <h1>Current Phase</h1><br /><p>{currentPhase}</p>*/}
            {currentPhase === 'allotment' && (<div><h1>Allotment Points</h1><br /><p>{allotmentLeft}</p></div>)}
          </div>
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
                      <td className="playerColorSidebar" style={{ background: colors[i] }}>
                      {
                        player === currentPlayer
                        && <img className="sidebar-icon" src={`../assets/${icons[currentPhase]}.svg`} />
                      }
                      </td>
                      <td>{player}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>)
      }

      {boardId && status !== 'waiting' && currentPlayer === user
        && (
          <div>
            <button className="phase-btn" onClick={() => changePhase(currentPhase, currentPlayer, playerOrder, allotmentPointsPerTurn, hexagons, boardId)}>
              {currentPhase === 'allotment' && 'Start Attack Phase'}
              {currentPhase === 'attack' && 'Start Fortification Phase'}
              {currentPhase === 'fortification' && 'End Turn'}
            </button>
          </div>
        )
      }

      {boardId
        && (
          <div className="leave-game-container">
            <button onClick={() => leaveGame(user, playerOrder)}>Leave Game</button>
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
  let hexagons = isBoardLoaded && state.board.hexes
  let currentPlayer = isBoardLoaded && state.board.state.currentPlayer || ''
  let attacksLeft = isBoardLoaded && Object.entries(attackMatrix(hexagons, currentPlayer)).length

  return {
    user: state.user.username,
    isLoggedIn: !!state.user.id,
    hexagons: hexagons,
    inGame: state.inGame,
    status: isBoardLoaded && state.board.state.status,
    currentPlayer: currentPlayer,
    currentPhase: isBoardLoaded && state.board.state.currentPhase || '',
    playerOrder: isBoardLoaded && state.board.state.playerOrder || [],
    allotmentPointsPerTurn: isBoardLoaded && state.board.state.allotmentPointsPerTurn,
    allotmentLeft: isBoardLoaded && state.board.state.allotmentLeft,
    attacksLeft: attacksLeft
  }
}

const mapDispatch = (dispatch, ownProps) => {
  const boardId = ownProps.match.params.boardId;

  return {
    handleClick() {
      dispatch(logout())
    },
    leaveGame(user, playerOrder) {
      const newPlayerOrder = playerOrder.filter(player => player !== user);
      dispatch(setInGame(false));
      ownProps.history.push('/');
      firebase.ref(`/boards/${boardId}/state`).update({ playerOrder: newPlayerOrder });
    },
    changePhase(
      currentPhase,
      currentPlayer,
      playerOrder,
      allotmentPointsPerTurn,
      hexagons,
      boardId
    ) {
      changePhaseFunction(
        currentPhase,
        currentPlayer,
        playerOrder,
        allotmentPointsPerTurn,
        hexagons,
        boardId)
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
