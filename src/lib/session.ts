'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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

export const logout = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};

export async function loginSupabase(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  await new Promise((resolve) => setTimeout(() => resolve({}), 5000));

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/dashboard');
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
  redirect('/dashboard');
}
