import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDhmCN8Bfbft-EUTng62bHbpfjPPtkV70Q",
    authDomain: "test-a978a.firebaseapp.com",
    databaseURL: "https://test-a978a.firebaseio.com",
    projectId: "test-a978a",
    storageBucket: "test-a978a.appspot.com",
    messagingSenderId: "7161614669"
  };
  export const firebaseRef=firebase.initializeApp(config);

  var database = firebase.database();
