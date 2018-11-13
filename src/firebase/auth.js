import firebase from './index';

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('email');

export const signIn = () => {
  return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const transformUser = (user) => {
  if (!user) return null;
  const { uid, email, displayName, photoUrl } = user;
  return {
    uid,
    email,
    displayName,
    photoUrl,
  };
};

const initialUserPromise = new Promise((res, rej) => {
  const unsub = firebase.auth().onAuthStateChanged((user) => {
    res(transformUser(user));
    unsub();
  });
});

export const getCurrentUser = async () => {
  const user = transformUser(firebase.auth().currentUser) || await initialUserPromise;
  if (!user) return null;
  return user;
};

