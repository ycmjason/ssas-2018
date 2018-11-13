import db from './index';

const gamesRef = db.collection('games');

export const getGamesForUser = async uid => {
  const querySnapshot = await gamesRef.where('participants', 'array-contains', uid).get();
  return querySnapshot.docs;
};
