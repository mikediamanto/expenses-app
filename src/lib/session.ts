'use server';

import { cookies } from 'next/headers';

export const getSession = async () => {
  const sessionCookie = (await cookies()).get('session')?.value;

  if (!sessionCookie) return null;

  return JSON.parse(atob(sessionCookie));
};

export const createSession = async (username: string) => {
  const expires = new Date(Date.now() + 100 * 1000);
  const session = await btoa(JSON.stringify({ username, expires }));

  (await cookies()).set('session', session, { expires, httpOnly: true });
};
