import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_sidebar.scss';

const Sidebar = (props) => {

  return (
    <div className="sidebar-wrapper">

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default connect(mapState, mapDispatch)(Sidebar);

/**
 * PROP TYPES
 */
Sidebar.propTypes = {

}
