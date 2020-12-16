import csv from 'csv-parse';
import fs from 'fs';
import { getRepository, In, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  filePath: string;
}

interface TransactionImported {
  title: string;
  value: number;
  type: 'income' | 'outcome';

  category: string;
}

class ImportTransactionsService {
  async execute({ filePath: path }: Request): Promise<Transaction[]> {
    // abre arquivo csv para leitura com módulo parse-csv
    const csvReader = fs.createReadStream(path).pipe(csv({ from_line: 2 }));

    const transactions: TransactionImported[] = [];
    const categoriesInput: string[] = [];

    // preenche os vetores de transação e categorias
    csvReader.on('data', async line => {
      const [title, type, value, category] = line.map((cell: string) =>
        cell.trim(),
      );

      if (!title || !type || !value || !category) return;

      const transaction = {
        title,
        type,
        value: Number(value),
        category,
      } as TransactionImported;

      transactions.push(transaction);

      categoriesInput.push(category);
    });

    // espera pela finalização da leitura
    await new Promise(resolve => csvReader.on('end', () => resolve()));

    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionsRepository);

    // todas as categorias que existem no banco e foram informadas no CSV
    const existentCategories: Category[] = await categoryRepository.find({
      where: { title: In(categoriesInput) },
    });

    // converte todas para string[], contendo apenas seu titulo
    const mappedExistentCategories = existentCategories.map(
      category => category.title,
    );

    // cria novo array com todos que não estão em existentCategories
    // e remove duplicados
    const nonExistentCategories = categoriesInput
      .filter(category => !mappedExistentCategories.includes(category))
      .filter((current, index, self) => self.indexOf(current) === index);

    // adiciona todos que ainda não foram inseridos no repositório
    const persistedCategories = categoryRepository.create(
      nonExistentCategories.map(category => ({ title: category })),
    );

    await categoryRepository.save(persistedCategories);

    const categories = [...persistedCategories, ...existentCategories];

    const newTransactions = transactionRepository.create(
      transactions.map(transaction => {
        return {
          title: transaction.title,
          type: transaction.type,
          value: transaction.value,
          category: categories.find(
            category => category.title === transaction.category,
          ),
        };
      }),
    );

    await transactionRepository.save(newTransactions);

    return newTransactions;
  }
}

export default ImportTransactionsService;
