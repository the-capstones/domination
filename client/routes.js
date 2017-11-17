import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
<<<<<<< HEAD
import { Main, Login, Signup, UserHome, Sidebar, Board, Settings, CombatRisk, CombatCustom } from './components';
=======
import { Main, Login, Signup, UserHome, Sidebar, Board, Settings, ChannelList } from './components';
>>>>>>> master
import { me } from './store';
/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Route path="/" component={Sidebar} />
          <Switch>
            <Route path="/play" component={Board} />
            <Route path="/channels" component={ChannelList} />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {
              isLoggedIn &&
              <Switch>
                <Route path="/home" component={UserHome} />
                <Route path="/settings" component={Settings} />
            <Route exact path="/combat-risk" component={CombatRisk} />
            <Route exact path="/combat-custom" component={CombatCustom} />
              </Switch>
            }
            <Route exact path="/login" component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
