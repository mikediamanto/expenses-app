import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllExpenses } from '@/lib/database/expenses';

const currencyFormatter = Intl.NumberFormat('el-GR', {
  style: 'currency',
  currency: 'EUR',
});

const dateFormatter = Intl.DateTimeFormat('el-GR', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

const Expenses = async () => {
  const expenses = await getAllExpenses();
  const sum = expenses
    ?.map((item) => item.amount)
    .reduce((acc, value) => (acc += value), 0);

  return (
    <main className="px-8 py-4">
      <Table>
        <TableCaption>A list of all your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Product</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses?.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell className="font-medium">
                {expense.productName}
              </TableCell>
              <TableCell>{dateFormatter.format(expense.created)}</TableCell>
              <TableCell className="text-right">
                {currencyFormatter.format(expense.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {currencyFormatter.format(sum)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </main>
  );
};

export default Expenses;
