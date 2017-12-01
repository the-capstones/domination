import React from 'react';
import '../css/_modal.scss';

// import '../css/_combat-risk.scss';

const PhaseModal = props => {
  let { phase } = props;
  phase = phase.toUpperCase()
  // const phase = props.match.params.phase

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h3>{phase} PHASE</h3>
        {phase === 'ALLOTMENT' &&
          (
            <div>
              <p>At the beginning of your turn, you can place additional units. Click on a hex to allot a unit to it.</p>
            </div>
          )
        }
        {phase === 'ATTACK' &&
          (
            <div>
              <p>Click on the territory you're attacking from. Then, click on the hex you want to attack and roll the dice. (You must have at least 2 units on a territory to attack.)</p>
            </div>
          )
        }
        {phase === 'FORTIFICATION' &&
          (
            <div>
              <p>At the end of your turn, you can move units from any one of your hexes to a neighboring hex that you own. This will move all but 1 unit from the starting hex. Click on the hex you'd like to move your units from, and then the hex you'd like to move them to.</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default PhaseModal;
