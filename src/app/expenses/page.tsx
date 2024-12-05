import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { getAllExpenses } from './manual/actions';

const currencyFormatter = Intl.NumberFormat('el-GR', {
  style: 'currency',
  currency: 'EUR',
});

const Expenses = async () => {
  const expenses = await getAllExpenses();
  const sum = expenses
    ?.map((item) => item.amount)
    .reduce((acc, value) => (acc += value), 0);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>product</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{currencyFormatter.format(item.amount)}</td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td>Total</td>
            <td>{currencyFormatter.format(sum)}</td>
          </tr>
        </tbody>
      </table>

      <Button asChild>
        <Link href="/expenses/scan">Scan receipt</Link>
      </Button>
      <Button asChild>
        <Link href="/expenses/manual">Manual</Link>
      </Button>
    </>
  );
};

export default Expenses;
