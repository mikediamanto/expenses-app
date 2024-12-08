'use server';

import { randomUUID } from 'crypto';
import { createClient } from '../supabase/server-client';

const getFilename = (file: File) => {
  const generatedFileName = randomUUID();
  const fullFilename = file.name.split('.')[0] || generatedFileName;
  const extension = file.type.replace('image/', '');

  return `${fullFilename}.${extension.replace('jpeg', 'jpg')}`;
};

export const saveImage = async (file: File) => {
  const filename = getFilename(file);
  const supabase = await createClient();
  await supabase.storage.from('avatars').upload(`/receipts/${filename}`, file);
};

export const getImages = async () => {
  const supabase = await createClient();
  const { data } = await supabase.storage.from('avatars').list('receipts');
  if (!data) return [];

  const urls = data.map(({ name }) => {
    const url = supabase.storage
      .from('avatars')
      .getPublicUrl(`receipts/${name}`).data.publicUrl;
    return url.replace(/%7D$/, '');
  });

  return urls.filter((url) => !url.includes('.empty'));
};
