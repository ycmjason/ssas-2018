import db, { getServerTimestamp, transformDocumentRef, executeQuery } from '/firebase/db';

import { getCurrentUser } from '/firebase/auth';

const gamesRef = db.collection('games');

const transformGameRef = async gameRef => {
  return await transformDocumentRef(gameRef);
};

export const findGameById = async id => {
  const gameRef = gamesRef.doc(id);
  return await transformGameRef(gameRef);
};

export const findGamesForUser = async ({ _ref }) => {
  const games = await executeQuery(gamesRef.where('participants', 'array-contains', _ref));
  return await games;
};

export const createGame = async ({ title, description }) => {
  const user = await getCurrentUser();
  if (!user) throw Error('Not signed in.');

  const userRef = (await getCurrentUser())._ref;
  const gameRef = await gamesRef.add({
    creator: userRef,
    title,
    description,
    participants: [userRef],
    timestamps: {
      created: getServerTimestamp(),
    },
  });

  return await transformDocumentRef(gameRef);
};

export const joinGame = async (game, user) => {
  await game._ref.update({
    participants: [...game.participants.map(({ _ref }) => _ref), user._ref],
  });
};

export const leaveGame = async (game, user) => {
  await game._ref.update({
    participants: [...game.participants.filter(({ uid }) => uid !== user.uid).map(({ _ref }) => _ref)],
  });
};

export const setAllocation = async (game, allocation) => {
  const currentUser = await getCurrentUser();
  if (currentUser.uid !== game.creator.uid) return;
  await game._ref.update({
    allocation: allocation.map(({ from, to }) => ({ from: from._ref, to: to._ref })),
    'timestamps.allocation': getServerTimestamp(),
  });
};
