import React from 'react'
import { connect } from 'react-redux'

import '../css/_room.scss';

const WaitingRoom = (props) => {
  console.log('PROPS IN WAITING ROOM ARE', props)
  const maxPlayers = props.board.maxPlayers
  const currPlayers = props.board.state.playerOrder.length || 1
  return (
    <div id="waiting-room">
      <div id="waiting-room-content">
        <div><p>Waiting for game to start</p></div>
        <div className="center"><i className="fa fa-cog fa-spin fa-5x fa-fw" /></div>
        <div><p>{currPlayers}/{maxPlayers} players in room</p></div>
      </div>
    </div>
  )
}

const mapState = state => {
  console.log('STATE IS', state)
  return {board: state.board}
}

const WaitingRoomContainer = connect(mapState)(WaitingRoom)

export default WaitingRoomContainer

