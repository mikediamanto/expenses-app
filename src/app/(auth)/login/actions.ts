'use server';

import { redirect } from 'next/navigation';
import { encode } from 'punycode';
import { publicEncrypt } from 'node:crypto';
import { cookies } from 'next/headers';
import { createSession } from '@/lib/session';
export const login = async (
  prevState: { message: string },
  formData: FormData
) => {
  const username = formData.get('username') as string;
  const password = formData.get('password');

  await createSession(username);

  redirect('/');
};
