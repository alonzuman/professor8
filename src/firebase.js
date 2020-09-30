import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAGKmeFbo7YW3FQcWheL80AvDdIbocVWNE',
  authDomain: 'professor8-7f7e6.firebaseapp.com',
  databaseURL: 'https://professor8-7f7e6.firebaseio.com',
  projectId: 'professor8-7f7e6',
  storageBucket: 'professor8-7f7e6.appspot.com',
  messagingSenderId: '1054788400115',
  appId: '1:1054788400115:web:bd7e55e940a251b520d886',
  measurementId: 'G-P37GSW6Z9F'
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const auth = app.auth();
