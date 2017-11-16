import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_settings.scss';

const Settings = (props) => {

  return (
    <div className="settings-wrapper">
      <div className="settings">
      </div>
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

export default connect(mapState, mapDispatch)(Settings);

/**
 * PROP TYPES
 */
Settings.propTypes = {

}
