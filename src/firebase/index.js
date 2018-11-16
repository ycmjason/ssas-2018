import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.VUE_APP_FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.envFIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
});

export default firebase;
