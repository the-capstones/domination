import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import {auth} from '../store'

import '../css/_auth-form.scss';

/**
 * COMPONENT
 */
const JoinGame = (props) => {
  const { handleSubmit } = props

  return (
    <div className="form">
      <h1>Join a Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roomId"><small>Enter room name or ID</small></label>
          <input name="roomId" type="text" />
        </div>

        <div>
          <button type="submit">Join Game</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

const mapState = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const gameId = evt.target.roomId
      // const formName = evt.target.name
      // const email = evt.target.email.value
      // const password = evt.target.password.value
      // dispatch(auth(email, password, formName))
      ownProps.history.push(`/play/${gameId}`)
    }
  }
}

export const Login = withRouter(connect(mapState, mapDispatch)(JoinGame))
