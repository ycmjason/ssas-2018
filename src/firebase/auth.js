import firebase from './index';
import { findUserByUid, findOrCreateUser } from './db/users';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');

const currentUserReady = new Promise((res, rej) => {
  const unsub = firebase.auth().onAuthStateChanged((user) => {
    res();
    unsub();
  });
});

export const signIn = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    await firebase.auth().signInWithPopup(provider);
    return findOrCreateUser(await getCurrentUser());
  } else {
    return currentUser;
  }
};

export const signOut = async () => await firebase.auth().signOut();

export const getCurrentUser = async () => {
  await currentUserReady;
  const user = firebase.auth().currentUser;
  if (!user) return null;
  return await findUserByUid(user.uid);
};
