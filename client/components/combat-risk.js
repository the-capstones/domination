import React from 'react';
import { dieRoll } from './dieRoll';
import '../css/_combat-risk.scss';

const CombatRisk = () => {

  const handleRoll = evnt => {
    evnt.preventDefault();

    let dieContainers = document.getElementsByClassName('die-container')
    Array.prototype.filter.call(dieContainers, function(container){
      let label = container.getElementsByTagName('label')
      let roll = dieRoll(1)
      label[0].innerHTML = roll
    })

    let enemyDieContainers = document.getElementsByClassName('enemy-die-container')
    Array.prototype.filter.call(enemyDieContainers, function(container){
      let label = container.getElementsByTagName('label')
      let roll = dieRoll(1)
      label[0].innerHTML = roll
    })
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
