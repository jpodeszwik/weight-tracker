import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCrdkYMkkosmc4IJkH946JLQm3CWBkgCio',
  authDomain: 'weight-tracker-166322.firebaseapp.com',
  databaseURL: 'https://weight-tracker-166322.firebaseio.com',
  projectId: 'weight-tracker-166322',
  storageBucket: 'weight-tracker-166322.appspot.com',
  messagingSenderId: '970458356704',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export const logInWithGoogle = () => auth.signInWithPopup(provider);
export const logOut = () => auth.signOut();
export const onUserChange = cb => auth.onAuthStateChanged(user => cb(user));
export const getCurrentUser = () => auth.currentUser;

export default firebase;
