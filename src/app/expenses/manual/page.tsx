import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createExpense } from '@/lib/database/expenses';
import { Label } from '@radix-ui/react-label';

const ExpensesManual = async () => {
  return (
    <Card className="mx-auto w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Add Expense</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4" action={createExpense}>
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="10.00"
              name="amount"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productName">Product</Label>
            <Input id="productName" type="text" required name="productName" />
          </div>
          {/* {state.message && <p>{state.message}</p>} */}
          <Button className="w-full">Submit Expense</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpensesManual;
