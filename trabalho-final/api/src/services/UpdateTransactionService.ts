// import AppError from '../errors/AppError';

import { getRepository, getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

/**
 * Não deverá atualizar o tipo e o valor após ser lançada
 */
interface Request {
  id: string;
  title: string;
  category: string;
}

class UpdateTransactionService {
  public async execute({
    id,
    title,
    category: categoryName,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const transaction = await transactionRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transação não existente');
    }

    let category = await categoryRepository.findOne({
      where: { title: categoryName },
    });

    // se não existir uma categoria deve criar uma nova
    if (!category) {
      category = categoryRepository.create({ title: categoryName });
      await categoryRepository.save(category);
    }

    transaction.title = title;
    transaction.category = category;

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default UpdateTransactionService;
