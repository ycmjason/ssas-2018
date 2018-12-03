import firebase from './index';
import { findUserByUid, createOrUpdateUser } from './db/users';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const signInWith = async (providerName) => {
  const provider = (() => {
    if (providerName === 'google') {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      return provider;
    }

    if (providerName === 'facebook') {
      const provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('email');
      provider.addScope('user_link');
      return provider;
    }

    throw Error(`Unknown provider: ${providerName}`);
  })();
  const { user, additionalUserInfo } = await firebase.auth().signInWithPopup(provider);

  const { displayName, photoURL, uid } = user;
  const { link, id } = additionalUserInfo.profile;

  const email = user.email || additionalUserInfo.profile.email;

  const providerIdField = (() => {
    if (providerName === 'google') {
      return 'gid';
    }

    if (providerName === 'facebook') {
      return 'fbid';
    }

    throw Error(`Unknown provider: ${providerName}`);
  })();

  return createOrUpdateUser({
    uid,
    [providerIdField]: id,
    displayName,
    email,
    photoURL,
    link,
  });
};

export const signInWithGoogle = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return currentUser;

  return await signInWith('google');
};

export const signInWithFacebook = async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) return currentUser;

  return await signInWith('facebook');
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
