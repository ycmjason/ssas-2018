import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: 'AIzaSyBMIKS6wrlOUGmjrExUPF5Qk0-dG-sJth0',
  authDomain: 'ssas-61724.firebaseapp.com',
  databaseURL: 'https://ssas-61724.firebaseio.com',
  projectId: 'ssas-61724',
  storageBucket: 'ssas-61724.appspot.com',
  messagingSenderId: '238339008983',
});

export default firebase;
