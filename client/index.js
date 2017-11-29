import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import firebase from './firebase'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
)


// the code below resets the database but keeps the model structure example (for clearing out tests)
// firebase.ref().set({
//   boards: {
//     boardId: {
//       hexes: {
//         hexId: {
//           playerId: '',
//           movesLeft: 2,
//           unit1: 0,
//           unit2: 0,
//           unit3: 0
//         }
//       },
//       state: {
//         currentPhase: {
//           allotment: 'remainingAllotment'
//         },
//         currentPlayer: 1,
//         gameSettings: 'default',
//         playerOrder: [1, 2, 3, 4]
//       },
//       boardName: 'name',
//       maxPlayers: 2
//     }
//   }
// })
