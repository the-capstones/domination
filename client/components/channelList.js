import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/_channe-list.scss';

const ChannelList = (props) => {

  return (
    <div className="channel-list-wrapper">
      <div className="channel-list">

        <div className="channel">
          <p>game#</p>
          <p>game name</p>
          <p>players 1/4</p>
          <button>Join Game</button>
        </div>

        <div className="channel">
          <p>game#</p>
          <p>game name</p>
          <p>players 1/4</p>
          <button>Join Game</button>
        </div>

        <div className="channel">
          <p>game#</p>
          <p>game name</p>
          <p>players 1/4</p>
          <button>Join Game</button>
        </div>

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

export default connect(mapState, mapDispatch)(ChannelList);

/**
 * PROP TYPES
 */
ChannelList.propTypes = {

}
