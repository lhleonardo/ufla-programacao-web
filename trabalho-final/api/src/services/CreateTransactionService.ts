// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  categoryName: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  public async execute({
    title,
    categoryName,
    type,
    value,
  }: Request): Promise<Transaction> {
    if (value <= 0) {
      throw new AppError('The value of transaction must be positive');
    }

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('Not enought money');
    }

    let category = await categoryRepository.findOne({
      where: { title: categoryName },
    });

    // se não existir uma categoria deve criar uma nova
    if (!category) {
      category = categoryRepository.create({ title: categoryName });
      await categoryRepository.save(category);
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
