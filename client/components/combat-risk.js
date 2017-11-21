import React from 'react';
import { connect } from 'react-redux';
import { dieRoll } from './dieRoll';
import firebase from '../firebase';
import '../css/_combat-risk.scss';

const CombatRisk = (props) => {
  const { defendingHex, attackingHex } = props;
  if (defendingHex && attackingHex) {
    let defendingUnits = defendingHex.unit1;
    let attackingUnits = attackingHex.unit1;
  }

  const handleRoll = evnt => {
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

    evaluate(playerRolls, enemyRolls);
  }

  const evaluate = (playerDice, enemyDice) => {
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
      defendingUnits--;
      this.props.updateUnits(this.props.defendingHex, defendingUnits);
    } else {
      attackingUnits--;
      this.props.updateUnits(this.props.attackingHex, attackingUnits);
    }

  }

  return (
    <div id="combat-wrapper" className="hidden">
      <div className="combat">
        <div className="player-container">

          <div className="option-container">
            <label>PLAYER</label>
            <button onClick={handleRoll}>ROLL</button>
            <button>END COMBAT</button>
          </div>

          <div className="unit-container">
            <h2>
              {props.attackingHex.unit1}
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
              {props.defendingHex.unit1}
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

const mapState = (state) => {
  return {
    defendingHex: state.board.state.SelectedHex,
    attackingHex: state.board.state.prevSelectedHex,
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    updateUnits(hexId, units) {
      firebase.ref(`/boards/${ownProps.boardId}/hexes/${hexId}`).update({ unit1: units })
    }
  }
}

export default connect(mapState, mapDispatch)(CombatRisk);
