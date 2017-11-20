import firebase from '../firebase';

export const divvySpaces = (playerOrder, hexes, boardId) => {
  const players = ['null', ...playerOrder];
  const numPlayers = playerOrder.length;
  let numPlayerSpaces;
  let numSpaces = Object.keys(hexes).length;
  let numVoidSpaces = Math.floor(numSpaces / 10) * 2;
  let numAllotSpaces = numSpaces - numVoidSpaces;


  if (numPlayers >= 1) {
    if (numAllotSpaces % numPlayers !== 0) {
      let numExtra = numAllotSpaces % numPlayers;
      numVoidSpaces += numExtra;
      numAllotSpaces -= numExtra;
    }

    numPlayerSpaces = numAllotSpaces / numPlayers;

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

    Object.keys(hexes).forEach(id => {
      while (hexes[id].playerId === '') {
        let assign = Math.floor(Math.random() * (numPlayers + 1));
        if (assignmentColors[assign].amount) {
          assignmentColors[assign].amount--
          hexes[id].playerId = players[assign]
          firebase.ref(`/boards/${boardId}/hexes/${id}`).update({playerId: players[assign]})
        }
      }
    })
  }
}
