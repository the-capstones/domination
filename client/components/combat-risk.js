import React from 'react';
import { dieRoll } from './dieRoll';
import '../css/_combat-risk.scss';

const CombatRisk = () => {

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
    let oneBigPlayer = 0;
    let twoBigPlayer = 0;
    let oneBigEnemy;
    let twoBigEnemy;

    if (enemyDice[0] > enemyDice[1]) {
      oneBigEnemy = enemyDice[0];
      twoBigEnemy = enemyDice[1];
    } else {
      oneBigEnemy = enemyDice[1];
      twoBigEnemy = enemyDice[0];
    }

    playerDice.forEach(die => {
      console.log('1 out ', oneBigPlayer)
      console.log('2 out ', twoBigPlayer)
      if (die >= oneBigPlayer) {
        twoBigPlayer = oneBigPlayer;
        oneBigPlayer = die;
      } else if (die > twoBigPlayer) {
        twoBigPlayer = die;
      }
    });

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
          <h2>10</h2>
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

        <div className="unit-container">
          <h2>10</h2>
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

export default CombatRisk;
