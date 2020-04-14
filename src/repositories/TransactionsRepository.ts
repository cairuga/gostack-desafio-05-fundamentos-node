import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const arrayIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .map(transaction => transaction.value);

    const incomes =
      arrayIncomes.length > 0
        ? arrayIncomes.reduce((total, next) => total + next)
        : 0;

    const arrayOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .map(transaction => transaction.value);

    const outcomes =
      arrayOutcomes.length > 0
        ? arrayOutcomes.reduce((total, next) => total + next)
        : 0;

    const balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
