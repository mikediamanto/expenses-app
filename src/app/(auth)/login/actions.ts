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

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server-client';

export async function loginSupabase(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}
