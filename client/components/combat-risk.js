import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dieRoll } from './dieRoll';
import firebase from '../firebase';
import '../css/_combat-risk.scss';

class CombatRisk extends Component {
  constructor(props){
    super(props)
  }

  handleRoll = (evnt, attackingUnits, defendingUnits) => {
    evnt.preventDefault();

    const playerRolls = [];
    let dieContainers = document.getElementsByClassName('die-container');
    Array.prototype.filter.call(dieContainers, function(container){
      let label = container.getElementsByTagName('label');
      let roll = dieRoll(1);
      label[0].innerHTML = roll;
      playerRolls.push(roll);
    })

    const enemyRolls = [];
    let enemyDieContainers = document.getElementsByClassName('enemy-die-container');
    Array.prototype.filter.call(enemyDieContainers, function(container){
      let label = container.getElementsByTagName('label');
      let roll = dieRoll(1);
      label[0].innerHTML = roll;
      enemyRolls.push(roll);
    })

    this.evaluate(playerRolls, enemyRolls, attackingUnits, defendingUnits);
  }

  evaluate = (playerDice, enemyDice, attackingUnits, defendingUnits) => {
    let enemyLargerRoll;
    let enemySmallerRoll;
    let playerLargerRoll = 0;
    let playerSmallerRoll = 0;

    if (enemyDice[0] > enemyDice[1]) {
      enemyLargerRoll = enemyDice[0];
      enemySmallerRoll = enemyDice[1];
    } else {
      enemyLargerRoll = enemyDice[1];
      enemySmallerRoll = enemyDice[0];
    }

    playerDice.forEach(die => {
      if (die >= playerLargerRoll) {
        playerSmallerRoll = playerLargerRoll;
        playerLargerRoll = die;
      } else if (die > playerSmallerRoll) {
        playerSmallerRoll = die;
      }
    });

    if (playerLargerRoll > enemyLargerRoll) {
      defendingUnits -= 1;
      this.props.updateUnits(this.props.defendingHexId, defendingUnits);
    } else {
      attackingUnits -= 1;
      this.props.updateUnits(this.props.attackingHexId, attackingUnits);
    }
  }

  render() {
    let attackingUnits = 0;
    let defendingUnits = 0;
    if (this.props.attackingHexId) {
      attackingUnits = this.props.hexes[this.props.attackingHexId].unit1;
    }
    if (this.props.defendingHexId) {
      defendingUnits = this.props.hexes[this.props.defendingHexId].unit1;
    }

    return (
      <div id="combat-wrapper" className="hidden">
        <div className="combat">
          <div className="player-container">

            <div className="option-container">
              <label>PLAYER</label>
              <button onClick={(evnt) => this.handleRoll(evnt, attackingUnits, defendingUnits)}>ROLL</button>
              <button>END COMBAT</button>
            </div>

            <div className="unit-container">
              <h2>
                {attackingUnits}
              </h2>
              <label>UNITS</label>
              <label>REMAINING</label>
            </div>

            <div className="roll-container">
              <div className="die-container">
                <img src="assets/wizard-avatar.jpg" />
                <label>-</label>
              </div>

              <div className="die-container">
                <img src="assets/wizard-avatar.jpg" />
                <label>-</label>
              </div>

              <div className="die-container">
                <img src="assets/wizard-avatar.jpg" />
                <label>-</label>
              </div>
            </div>

          </div>

          <div className="result">
            <label>RESULT</label>
          </div>

          <div className="enemy-container">

            <div className="option-container">
              <label>ENEMY</label>
            </div>

            <div className="enemy-unit-container">
              <h2>
                {defendingUnits}
              </h2>
              <label>UNITS</label>
              <label>REMAINING</label>
            </div>


            <div className="roll-container">
              <div className="enemy-die-container">
                <img src="assets/wizard-avatar.jpg" />
                <label>-</label>
              </div>

              <div className="enemy-die-container">
                <img src="assets/wizard-avatar.jpg" />
                <label>-</label>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    defendingHexId: state.board.state.SelectedHex,
    attackingHexId: state.board.state.prevSelectedHex,
    hexes: state.board.hexes
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateUnits(hexId, units) {
      firebase.ref(`/boards/${ownProps.boardId}/hexes/${hexId}`).update({ unit1: units })
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(CombatRisk));
