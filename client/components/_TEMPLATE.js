import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import '../css/_component.scss';

const COMPONENT = (props) => {

  return (
    <div className="component-wrapper">

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

export default connect(mapState, mapDispatch)(COMPONENT);

/**
 * PROP TYPES
 */
COMPONENT.propTypes = {

}
