import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_settings.scss';

const Settings = (props) => {


  return (
    <div className="settings-wrapper">
      <div className="settings">
       <h1>BOARD SETTINGS</h1>

{
        //   <form id="board-settings" onSubmit={configBoard}>
        //   <h3>Board width: </h3><input name="width" type="number" min="5" max="10" /><br />
        //   <h3>Board height: </h3><input name="height" type="number" min="5" max="10" /><br />
        //   <input type="submit" value="submit" />
        // </form>
}      </div>
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
    configBoard(event) {
      event.preventDefault();
      const boardHeight = event.target.height.value;
      const boardWidth = event.target.width.value;

    }
  }
}

export default connect(mapState, mapDispatch)(Settings);

/**
 * PROP TYPES
 */
Settings.propTypes = {

}
