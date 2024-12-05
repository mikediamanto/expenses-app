'use server';

import { redirect } from 'next/navigation';
import { createSession } from '@/lib/session';
export const login = async (
  prevState: { message: string },
  formData: FormData
) => {
  const username = formData.get('username') as string;

  await createSession(username);

  redirect('/');
};
