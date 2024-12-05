export interface Expense {
  productName: string;
  amount: number;
}

export interface Product {
  name: string;
  created_at: Date;
  id: number;
}

export enum ProductType {
  supermarket,
}
