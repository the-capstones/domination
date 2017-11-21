import React from 'react';
import { connect } from 'react-redux';
import { dieRoll } from './dieRoll';
import '../css/_combat-risk.scss';

const CombatRisk = (props) => {
  let playerUnits = 10;
  let enemyUnits = 10;

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
    // let enemyRoll = enemyDice[0];

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

    // if (playerDice[0] > playerDice[1]) {
    //   playerLargerRoll = playerDice[0];
    //   playerSmallerRoll = playerDice[1];
    // } else {
    //   playerLargerRoll = playerDice[1];
    //   playerSmallerRoll = playerDice[0];
    // }

    if (playerLargerRoll > enemyLargerRoll) {
      enemyUnits -= 1;
      console.log(enemyUnits)
    } else {
      playerUnits -= 1;
      console.log(playerUnits)
    }

  }

  return (
    <div className="combat">
      <div className="player-container">

        <div className="option-container">
          <label>PLAYER</label>
          <button onClick={handleRoll}>ROLL</button>
          <button>END COMBAT</button>
        </div>

        <div className="unit-container">
          <h2 id="player-units">{playerUnits}</h2>
          <label>UNITS</label>
          <label>REMAINING</label>
        </div>

        {

        }
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
          <h2 id="enemy-units">{enemyUnits}</h2>
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
  )
}

const mapState = (state) => {
  return {
    currentPhase: state.board.state.currentPhase,
    selectedHex: state.board.state.selectedHex,
    hexes: state.board.hexes,
    playerOrder: state.board.state.playerOrder
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    renderAllotmentGUI(phase, id, selectedHexId) {
      if (phase === 'allotment') {
        const selectedHex = document.getElementById(`${selectedHexId}-algui`);
        selectedHexId && selectedHex.classList.remove('show');
        const gui = document.getElementById(`${id}-algui`);
        gui.classList.add('show');
      }
    },
    selectHex(id) {
      firebase.ref(`/boards/${ownProps.boardId}/state`).update({ selectedHex: id })
    }
  }
}

export default connect(mapState, mapDispatch)(CombatRisk);
