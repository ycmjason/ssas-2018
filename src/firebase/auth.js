import firebase from './index';
import { findUserByUid, createOrUpdateUser } from './db/users';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const signInWithGoogle = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const a = await firebase.auth().signInWithPopup(provider);
    const { user, additionalUserInfo } = a;

    const { displayName, email, photoURL, uid } = user;
    const { link, id: gid } = additionalUserInfo.profile;

    return createOrUpdateUser({
      uid,
      gid,
      displayName,
      email,
      photoURL,
      link,
    });
  } else {
    return currentUser;
  }
};

export const signInWithFacebook = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser === null) {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('user_link');
    const { user, additionalUserInfo } = await firebase.auth().signInWithPopup(provider);

    const { displayName, email, photoURL, uid } = user;
    const { link, id: fbid } = additionalUserInfo.profile;

    return createOrUpdateUser({
      uid,
      fbid,
      displayName,
      email,
      photoURL,
      link: link || `https://www.facebook.com/search/people/?q=${window.encodeURIComponent(displayName)}`,
    });
  } else {
    return currentUser;
  }
};

export const signOut = async () => await firebase.auth().signOut();

export const getCurrentUser = (() => {
  const currentUserReady = new Promise((res, rej) => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      res();
      unsub();
    });
  });

  return async () => {
    await currentUserReady;
    const user = firebase.auth().currentUser;
    if (!user) return null;
    return await findUserByUid(user.uid);
  };
})();
