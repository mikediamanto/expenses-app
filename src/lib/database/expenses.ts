'use server';

import { redirect } from 'next/navigation';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '../supabase/server-client';
import { ProductType } from './types';

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

  redirect('/expenses');
};

export const getAllExpenses = async () => {
  const supabase = await createClient();

  const productsWithExpensesQuery = supabase.from('products').select(`
    id,
    name,
    expenses(
      id,
      created_at,
      amount
    )
    `);

  const { data } = await productsWithExpensesQuery;

  const expenses = data?.flatMap((item) =>
    item.expenses.map((expense) => ({
      ...expense,
      created: new Date(expense.created_at),
      productName: item.name,
    }))
  );

  // const expenses = (await supabase.from('expenses').select('*')).data;
  return expenses;
};
