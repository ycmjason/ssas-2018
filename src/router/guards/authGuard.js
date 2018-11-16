import { getCurrentUser } from '@/firebase/auth';

export default async (to, from, next) => {
  if (await getCurrentUser() === null) {
    console.log(to);
    return next({
      name: 'Landing',
      query: {
        returnTo: to.fullPath,
        invite: to.name === 'Game' && to.query.invite,
      },
    });
  }

  next();
};
