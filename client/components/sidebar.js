import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, initializeBoard } from '../store';

import '../css/_sidebar.scss';

const Sidebar = (props) => {

const { isLoggedIn, handleClick, inGame, tempChangeInGame } = props;

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
          <Link to="/play" onClick={tempChangeInGame}>Start Game</Link>
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

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    inGame: state.inGame,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    tempChangeInGame() {
      dispatch(initializeBoard(true))
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
