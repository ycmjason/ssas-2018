import firebase from './index';
import { findOrCreateCurrentUser } from './db/users';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');

const transformUser = (user) => {
  if (!user) return null;
  const { uid, email, displayName, photoURL } = user;
  return {
    uid,
    email,
    displayName,
    photoURL,
  };
};

const currentUserReady = new Promise((res, rej) => {
  const unsub = firebase.auth().onAuthStateChanged((user) => {
    res();
    unsub();
  });
});

export const signIn = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    const { user } = await firebase.auth().signInWithPopup(provider);
    findOrCreateCurrentUser();
    return transformUser(user);
  } else {
    return currentUser;
  }
};

export const signOut = async () => await firebase.auth().signOut();

export const getCurrentUser = async () => {
  await currentUserReady;
  const user = transformUser(firebase.auth().currentUser);
  if (!user) return null;
  return user;
};

