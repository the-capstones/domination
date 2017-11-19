import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from '../firebase'

import '../css/_room.scss';

const WaitingRoom = (props) => {
  const { board, user } = props
  const maxPlayers = board.maxPlayers
  const numPlayers = board.state.playerOrder.length
  const players = board.state.playerOrder

  const divvySpaces = () => {
    let numPlayerSpaces;
    let numVoidSpaces = Math.floor(this.state.hexagons.length / 10) * 2;
    let numAllotSpaces = this.state.hexagons.length - numVoidSpaces;

    if (numPlayers >= 2) {
      if (numAllotSpaces % numPlayers !== 0) {
        let numExtra = numAllotSpaces % numPlayers;
        numVoidSpaces += numExtra;
        numAllotSpaces -= numExtra;
      }

      numPlayerSpaces = numAllotSpaces / numPlayers;

      console.log('Spaces/Player', numPlayerSpaces)
      console.log('VOID', numVoidSpaces)

      let numRed = numPlayerSpaces;
      let numOrange = numPlayerSpaces;
      let numYellow = numPlayerSpaces;
      let numGreen = numPlayerSpaces;
      let numBlue = numPlayerSpaces;

      let assignmentColors = [
        {color: 'black', amount: numVoidSpaces},
        {color: 'red', amount: numRed},
        {color: 'orange', amount: numOrange},
        {color: 'yellow', amount: numYellow},
        {color: 'green', amount: numGreen},
        {color: 'blue', amount: numBlue}]

      this.state.hexagons.forEach(hex => {
        hex = document.getElementById(hex.id)
        while (!hex.classList[0]) {
          let assign = Math.floor(Math.random() * (numPlayers + 1));
          if (assignmentColors[assign].amount) {
            assignmentColors[assign].amount--
            switch (assignmentColors[assign].color) {
              case 'black':
                return hex.classList.add('hex-fill-black');
              case 'red':
                return hex.classList.add('hex-fill-red');
              case 'orange':
                return hex.classList.add('hex-fill-orange');
              case 'yellow':
                return hex.classList.add('hex-fill-yellow');
              case 'green':
                return hex.classList.add('hex-fill-green');
              case 'blue':
                return hex.classList.add('hex-fill-blue');
              default:
                break;
            }
          }
        }
      })
    }
  }

  return (
    <div id="waiting-room">
      <div id="waiting-room-content">
        <div><p>Waiting for game to start</p></div>
        <div className="center"><i className="fa fa-cog fa-spin fa-5x fa-fw" /></div>
        <div><p>{numPlayers}/{maxPlayers} players in room</p></div>
        { user.id === board.state.currentPlayer &&
          (
            <div className="center">
              <button
                className="text"
                type="submit"
                onClick={props.startGame}
              >
                Start Game
              </button>
              </div>
          )
        }
      </div>
    </div>
  )
}

const mapState = state => {
  return {board: state.board, user: state.user}
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    startGame(evt){
      evt.preventDefault()
      const boardId = ownProps.match.params.boardId
      firebase.ref(`/boards/${boardId}/state`).update({status: 'playing'})
    }
  }
}
const WaitingRoomContainer = withRouter(connect(mapState, mapDispatch)(WaitingRoom))

export default WaitingRoomContainer

