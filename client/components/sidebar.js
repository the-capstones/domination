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
        <button class="dropbtn">Menu</button>
        <div class="dropdown-content">
          {
            isLoggedIn
              ? <div>
                <Link to="/home">Home</Link>
                <a href="#" onClick={handleClick}>Logout</a>
              </div>
              : <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
          }
        </div>
      </nav>
      <div className="players">
        <table>
          <tbody>
            <tr>
              <th><i class="fa fa-pie-chart" aria-hidden="true"></i>
              </th>
              <th>Username</th>
            </tr>
            <tr>
              <td style={{ background: 'salmon' }}><i class="fa fa-arrow-right" aria-hidden="true"></i>
              </td>
              <td>Smith</td>
            </tr>
            <tr>
              <td style={{ background: 'skyblue' }}></td>
              <td>Jackson</td>
            </tr>
            <tr>
              <td style={{ background: 'lightgreen' }}></td>
              <td>Johnson</td>
            </tr>
            <tr>
              <td style={{ background: 'orchid' }}></td>
              <td>Simpson</td>
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
