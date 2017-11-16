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
      <nav>
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
      </nav>
      <div className="players">
        <button>Scoreboard</button>
        <table>
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
