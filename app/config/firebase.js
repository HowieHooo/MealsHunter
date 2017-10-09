import * as firebase from 'firebase';
  // Initialize Firebase
const fireBaseConfig = {
    apiKey: "AIzaSyAhuPtrZvCLky87TpaKozBMXttkMEufFqQ",
    authDomain: "mealhunter-71d48.firebaseapp.com",
    databaseURL: "https://mealhunter-71d48.firebaseio.com",
    projectId: "mealhunter-71d48",
    storageBucket: "mealhunter-71d48.appspot.com",
    messagingSenderId: "15240317438"
  };

const firebaseApp = firebase.initializeApp(fireBaseConfig);

//export it then we can require and import it in the other page
module.exports = firebaseApp
