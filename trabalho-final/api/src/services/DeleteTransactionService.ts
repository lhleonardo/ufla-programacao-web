// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  transactionId: string;
}

class DeleteTransactionService {
  public async execute({ transactionId }: Request): Promise<void> {
    // TODO
    const repository = getCustomRepository(TransactionsRepository);

    await repository.delete(transactionId);
  }
}

export default DeleteTransactionService;
