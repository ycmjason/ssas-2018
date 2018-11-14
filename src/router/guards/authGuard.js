import { getCurrentUser } from '@/firebase/auth';

export default async (from, to, next) => {
  if (await getCurrentUser() === null) next({ name: 'landing' });

  next();
};
