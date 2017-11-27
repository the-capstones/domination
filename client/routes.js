import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main,
  Login,
  Signup,
  UserHome,
  Sidebar,
  Room,
  CombatRisk,
  CombatCustom,
  ChannelList,
  AllotmentGUI,
  NewGame,
} from './components';
import { me } from './store';

// COMPONENT

class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Router history={history}>
        <Main>
          <Route exact path="/boards/:boardId/battle" component={CombatRisk} />
          <Switch>
            <Route path="/boards/:boardId" component={Sidebar} />
            <Route path="/" component={Sidebar} />
          </Switch>
          <Switch>
          <Route path="/boards/:boardId" component={Room} />
          <Route path="/newGame" component={NewGame} />
            <Route path="/channels" component={ChannelList} />
            {!isLoggedIn && <Route exact path="/" component={Login} />}
            {isLoggedIn && <Route exact path="/" component={ChannelList} />}
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {
              isLoggedIn &&
              <Switch>
                <Route path="/home" component={UserHome} />
                <Route exact path="/combat-custom" component={CombatCustom} />
                <Route exact path="/allotment" component={AllotmentGUI} />
              </Switch>
            }
          </Switch>
        </Main>
      </Router>
    )
  }
}

// CONTAINER

const mapState = (state) => {
  return {
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

// PROP TYPES

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
