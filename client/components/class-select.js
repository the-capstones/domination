import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import '../css/_class-select.scss';

const ClassSelect = (props) => {
  const classOptions = ['king', 'soldier', 'soldier1', 'soldier2', 'viking', 'wizard'];
  // user.avatar = `../assets/avatar/${avatarChoice}-avatar.png`
  return (
    <div className="class-select-wrapper">
      <form>
        {
          classOptions.map((playerClass, i) =>
            (<input
              key={i}
              className="class-select"
              type="radio"
              name="class-select"
              value={playerClass}
            />)
          )
        }
      </form>
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

export default connect(mapState, mapDispatch)(ClassSelect);

/**
 * PROP TYPES
 */
ClassSelect.propTypes = {

}
