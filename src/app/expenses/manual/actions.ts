/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { ProductType } from '@/lib/database/types';
import { createClient } from '@/lib/supabase/server-client';

export const createExpense = async (formData: FormData) => {
  const supabase = await createClient();
  const product = {
    name: formData.get('productName'),
    type: ProductType.supermarket,
  };

  let productEntity: any = (
    await supabase.from('products').select('id').eq('name', product.name)
  )?.data?.[0];

  if (!productEntity) {
    const insertResponse = await supabase.from('products').insert(product);
    console.log(insertResponse);
  }

  productEntity = (
    await supabase.from('products').select('id').eq('name', product.name)
  )?.data?.[0];

  const expense = {
    amount: Number.parseFloat(formData.get('amount') as string),
    product_id: productEntity?.id,
  };

  await supabase.from('expenses').insert(expense);
};

export const getAllExpenses = async () => {
  const supabase = await createClient();
  const expenses = (await supabase.from('expenses').select('*')).data;
  return expenses;
};
