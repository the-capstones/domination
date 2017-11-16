import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import '../css/_sidebar.scss';

const Sidebar = (props) => {
  const { isLoggedIn } = props;

  return (
    <div className="sidebar-wrapper">

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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Sidebar);

/**
 * PROP TYPES
 */
Sidebar.propTypes = {

}
