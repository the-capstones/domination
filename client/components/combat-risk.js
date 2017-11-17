import React from 'react';

import '../css/_combat-risk.scss';

const CombatRisk = () => {
  return (
    <div className="combat">
      <div className="player-container">

        <div className="option-container">
          <label>PLAYER</label>
          <button>ROLL</button>
          <button>END COMBAT</button>
        </div>

        <div className="unit-container">
          <h2>10</h2>
          <label>UNITS</label>
          <label>REMAINING</label>
        </div>

        <div className="roll-container">
          <div className="die-container">
            <img src="assets/wizard-avatar.jpg" />
            <label>6</label>
          </div>

          <div className="die-container">
            <img src="assets/wizard-avatar.jpg" />
            <label>6</label>
          </div>

          <div className="die-container">
            <img src="assets/wizard-avatar.jpg" />
            <label>6</label>
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
            <label>6</label>
          </div>

          <div className="enemy-die-container">
            <img src="assets/wizard-avatar.jpg" />
            <label>6</label>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CombatRisk;
