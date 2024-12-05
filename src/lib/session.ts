'use server';

import { cookies } from 'next/headers';
import { createClient } from './supabase/server-client';
import { User } from '@supabase/supabase-js';

export const getSession = async (): Promise<User | null> => {
  const supabase = await createClient();
  const response = await supabase.auth.getUser();

  if (!response || response.error) {
    return null;
  }

  return response.data.user;
};

export const createSession = async (username: string) => {
  const expires = new Date(Date.now() + 100 * 1000);
  const session = await btoa(JSON.stringify({ username, expires }));

  (await cookies()).set('session', session, { expires, httpOnly: true });
};
