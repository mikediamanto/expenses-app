import { createExpense } from './actions';

const ExpensesManual = async () => {
  const formData = new FormData();
  formData.append('amount', '10.25');
  formData.append('productName', 'Nero');
  await createExpense(formData);
  return <div>ExpensesManual</div>;
};

export default ExpensesManual;
