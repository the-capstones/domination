import * as firebase from 'firebase'

let config = {
  apiKey: 'AIzaSyCRCa0TRGbWacmQeg2IOqQ9Lc9-rnn2Jmc',
  databaseURL: 'https://domination-186219.firebaseio.com',
  projectId: 'domination-186219',
  storageBucket: 'domination-186219.appspot.com',
  messagingSenderId: '427233017537'
};

firebase.initializeApp(config);

const database = firebase.database()
firebase.database.enableLogging(true)
export default database
