import React, { Component } from 'react'
import { connect } from 'react-redux'


export class AllotmentGUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //visibility will be 'show' or 'hide' (for styling later)?
      visibility: show,
      remaining: 3
    }
  }


  render() {
    return (
      <div id='allotment-gui-container' className={this.state.visibility}>

        <div id='allotment-amount'>
          <span className='muted'>{this.state.remaining}</span><span>remaining units</span>
        </div>

        <div id='allotment-control'>

          <div id='allotment-totals-container'>
              <div id='total-spaces-owned'>
                <p>#</p>
              </div>
              <div id='total-units-owned'>
                <p>#</p>
              </div>
          </div>

          <div id='allotment-unit-container'>
            <div id='unit-allotment-container'>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

const mapState = state => {
  return {
    player: state.players.currentPlayer
  }
}

const AllotmentGUIContainer = connect(mapState)(AllotmentGUI)
