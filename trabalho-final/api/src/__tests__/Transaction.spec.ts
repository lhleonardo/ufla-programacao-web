import request from 'supertest';
import path from 'path';
import { Connection, getRepository, getConnection } from 'typeorm';
import createConnection from '../database';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import app from '../app';

let connection: Connection;

describe('Transações', () => {
  beforeAll(async () => {
    connection = await createConnection('test-connection');

    await connection.query('DROP TABLE IF EXISTS transactions');
    await connection.query('DROP TABLE IF EXISTS categories');
    await connection.query('DROP TABLE IF EXISTS migrations');

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM transactions');
    await connection.query('DELETE FROM categories');
  });

  afterAll(async () => {
    const mainConnection = getConnection();

    await connection.close();
    await mainConnection.close();
  });

  it('Deve listar as transações', async () => {
    await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    await request(app).post('/transactions').send({
      title: 'April Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    await request(app).post('/transactions').send({
      title: 'Macbook',
      type: 'outcome',
      value: 6000,
      category: 'Eletronics',
    });

    const response = await request(app).get('/transactions');

    expect(response.body.transactions).toHaveLength(3);
    expect(response.body.balance).toMatchObject({
      income: 8000,
      outcome: 6000,
      total: 2000,
    });
  });

  it('Deve criar uma nova transação', async () => {
    const transactionsRepository = getRepository(Transaction);

    const response = await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
      },
    });

    expect(transaction).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('Deve criar as categorias automaticamente ao cadastro', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const response = await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    const category = await categoriesRepository.findOne({
      where: {
        title: 'Salary',
      },
    });

    expect(category).toBeTruthy();

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
        category_id: category?.id,
      },
    });

    expect(transaction).toBeTruthy();

    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
      }),
    );
  });

  it('Não deve criar categorias de forma que fiquem duplicadas', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const { identifiers } = await categoriesRepository.insert({
      title: 'Salary',
    });

    const insertedCategoryId = identifiers[0].id;

    await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    const transaction = await transactionsRepository.findOne({
      where: {
        title: 'March Salary',
        category_id: insertedCategoryId,
      },
    });

    const categoriesCount = await categoriesRepository.find();

    expect(categoriesCount).toHaveLength(1);
    expect(transaction).toBeTruthy();
  });

  it('Não deve registrar transação de saída caso não tenha saldo suficiente', async () => {
    await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    const response = await request(app).post('/transactions').send({
      title: 'iPhone',
      type: 'outcome',
      value: 4500,
      category: 'Eletronics',
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        status: 'error',
        message: expect.any(String),
      }),
    );
  });

  it('Deve excluir uma transação', async () => {
    const transactionsRepository = getRepository(Transaction);

    const response = await request(app).post('/transactions').send({
      title: 'March Salary',
      type: 'income',
      value: 4000,
      category: 'Salary',
    });

    await request(app).delete(`/transactions/${response.body.id}`);

    const transaction = await transactionsRepository.findOne(response.body.id);

    expect(transaction).toBeFalsy();
  });

  it('Deve importar uma transação de um arquivo csv', async () => {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    const importCSV = path.resolve(__dirname, 'import_template.csv');

    await request(app).post('/transactions/import').attach('file', importCSV);

    const transactions = await transactionsRepository.find();
    const categories = await categoriesRepository.find();

    expect(categories).toHaveLength(2);
    expect(categories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Others',
        }),
        expect.objectContaining({
          title: 'Food',
        }),
      ]),
    );

    expect(transactions).toHaveLength(3);
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'Loan',
          type: 'income',
        }),
        expect.objectContaining({
          title: 'Website Hosting',
          type: 'outcome',
        }),
        expect.objectContaining({
          title: 'Ice cream',
          type: 'outcome',
        }),
      ]),
    );
  });
});
