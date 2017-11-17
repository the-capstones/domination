import React from 'react';

import '../css/_combat-custom.scss';

const CombatCustom = () => {
  return (
    <div className="combat">
      <div className="battalion-container">
        <div className="type-container">

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT A</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT B</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT C</p>
          </div>

          <label>RESERVE FORCES</label>
        </div>

        <div className="type-container">
          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT A</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT B</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT C</p>
          </div>
          <label>ACTIVE FORCES</label>
        </div>
      </div>

      <div className="dice-container">
        <div className="die-display-player">
          <h4>PLAYER</h4>
          <h3>DIE</h3>
        </div>
        <label>RESULT</label>
        <div className="die-display-enemy">
          <h3>DIE</h3>
          <h4>PLAYER</h4>
        </div>
      </div>

      <div className="battalion-container">
        <div className="type-container">
          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT A</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT B</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT C</p>
          </div>
        <label>ACTIVE FORCES</label>
        </div>

        <div className="type-container">
          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT A</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT B</p>
          </div>

          <div className="unit-container">
            <img src="assets/wizard-avatar.jpg" />
            <p>UNIT C</p>
          </div>
        <label>RESERVE FORCES</label>
        </div>
      </div>
    </div>
  )
}

export default CombatCustom;
