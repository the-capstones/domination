import React from 'react';

const Combat = () => {
  return (
    <div>
      <div className="battalion-container">
        <div className="reserve-units">
          <img id="unit-a" />
          <img id="unit-b" />
          <img id="unit-c" />
          <p>RESERVE FORCES</p>
        </div>

        <div className="active-units">
          <img id="unit-a" />
          <img id="unit-b" />
          <img id="unit-c" />
          <p>ACTIVE FORCES</p>
        </div>
      </div>

      <div className="combat-container">
        <div className="die-display">
          <h4>PLAYER</h4>
          <h3>DIE</h3>
        </div>
        <h2>RESULT</h2>
        <div className="die-display">
          <h3>DIE</h3>
          <h4>PLAYER</h4>
        </div>
      </div>

      <div className="battalion-container">
        <div className="reserve-units">
          <img id="unit-a" />
          <img id="unit-b" />
          <img id="unit-c" />
          <p>RESERVE FORCES</p>
        </div>

        <div className="active-units">
          <img id="unit-a" />
          <img id="unit-b" />
          <img id="unit-c" />
          <p>ACTIVE FORCES</p>
        </div>
      </div>
    </div>
  )
}

export default Combat;
