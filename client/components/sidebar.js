import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, setInGame, setCurrentPhase, setCurrentPlayer } from '../store';

import '../css/_sidebar.scss';

const Sidebar = (props) => {

  const {
    isLoggedIn,
    handleClick,
    inGame,
    user,
    currentPhase,
    currentPlayer,
    changePhase,
    playerOrder,
  } = props;

  return (
    <div className="sidebar-wrapper">
      <h1>DOMINATION</h1>

      <nav className="dropdown">
        <button className="dropbtn">Menu</button>
        <div className="dropdown-content">
          {
            isLoggedIn
              ? <div>
                <Link to="/home">Home</Link>
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
          <Link to="/newGame">Start Game</Link>
          <Link to="/settings">Settings</Link>
        </div>
      </div>)
      }

      {inGame
        && (<div>
          <div className="avatar">
            <img src="assets/wizard-avatar.jpg" />
          </div>

          <div className="players">
            <table>
              <tbody>
                <tr>
                  <th><i className="fa fa-pie-chart" aria-hidden="true"></i>
                  </th>
                  <th>Username</th>
                </tr>
                <tr>
                  <td style={{ background: '#b3482e' }}><i className="fa fa-arrow-right" aria-hidden="true"></i>
                  </td>
                  <td>Smith</td>
                </tr>
                <tr>
                  <td style={{ background: '#c7723d' }}></td>
                  <td>Jackson</td>
                </tr>
                <tr>
                  <td style={{ background: '#d5a149' }}></td>
                  <td>Johnson</td>
                </tr>
                <tr>
                  <td style={{ background: '#83ada0' }}></td>
                  <td>Simpson</td>
                </tr>
                <tr>
                  <td style={{ background: '#6f9bc4' }}></td>
                  <td>Friedmen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>)
      }

      {currentPlayer === user
        && inGame
        && (
          <div>
            <button className="phase-btn" onClick={() => changePhase(currentPhase, currentPlayer, playerOrder)}>
              {
                currentPhase === 'allotment' ? 'Start Attack Phase' : 'End Turn'
              }
            </button>
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
  return {
    user: state.user.email,
    isLoggedIn: !!state.user.id,
    inGame: state.inGame,
    currentPlayer: state.board.state.currentPlayer,
    currentPhase: state.board.state.currentPhase,
    playerOrder: state.board.state.playerOrder,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    changePhase(currentPhase, currentPlayer, playerOrder) {
      if (currentPhase === 'allotment') {
        dispatch(setCurrentPhase('attack'));
      }
      else {
        const currIdx = playerOrder.indexOf(currentPlayer);
        let nextIdx;

        if (currIdx === playerOrder.length - 1) {
          nextIdx = 0;
        }
        else {
          nextIdx = currIdx + 1;
        }

        const nextPlayer = playerOrder[nextIdx];
        dispatch(setCurrentPlayer(nextPlayer));
        dispatch(setCurrentPhase('allotment'));
      }
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar);

/**
 * PROP TYPES
 */
Sidebar.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
