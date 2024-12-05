'use server';

import { createClient } from '../supabase/server-client';
import { Product } from './types';

export const createExpense = async () => {
  const supabase = await createClient();
  //   try {
  //     const response = await supabase
  //       .from('products')
  //       .insert({ name: 'Γαλα', type: ProductType.supermarket });
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  const { data } = await supabase
    .from('products')
    .select('*')
    .returns<Product[]>();
  console.log(data);
};
