import firebase from './index';
import { findUserByUid, findOrCreateUser } from './db/users';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');
provider.addScope('user_link');

const currentUserReady = new Promise((res, rej) => {
  const unsub = firebase.auth().onAuthStateChanged((user) => {
    res();
    unsub();
  });
});

export const signIn = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    const { user, additionalUserInfo } = await firebase.auth().signInWithPopup(provider);

    const { displayName, email, photoURL, uid } = user;
    const { link } = additionalUserInfo.profile;

    return findOrCreateUser({
      displayName,
      email,
      photoURL,
      uid,
      link,
    });
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
