import React, { useState, useEffect } from 'react';

import income from '../../assets/income.svg';
import dislike from '../../assets/dislike.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { FiEdit, FiTrash2 } from 'react-icons/fi';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  Empty,
} from './styles';
import { Link } from 'react-router-dom';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { id?: string; title: string };
  createdAt: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ApiResponse {
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
  transactions: Omit<Transaction, 'formattedValue' | 'formattedDate'>[];
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      const response = await api.get<ApiResponse>('/transactions');

      const {
        balance: balanceResponse,
        transactions: transactionsResponse,
      } = response.data;

      const newBalance: Balance = {
        income: formatValue(balanceResponse.income),
        outcome: formatValue(balanceResponse.outcome),
        total: formatValue(balanceResponse.total),
      };

      const newTransactions: Transaction[] = transactionsResponse.map(
        transaction => ({
          ...transaction,
          formattedDate: new Date(transaction.createdAt).toLocaleDateString(
            'pt-br',
          ),
          formattedValue: formatValue(transaction.value),
        }),
      );

      setBalance(newBalance);
      setTransactions(newTransactions);
    }

    loadTransactions();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          {transactions.length === 0 && (
            <Empty>
              <img src={dislike} alt="Dislike" />
              <span>Você ainda não registrou nenhuma transação</span>
            </Empty>
          )}

          {transactions.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td className="title">{transaction.title}</td>
                    <td className={transaction.type}>
                      {transaction.type === 'outcome' && ' - '}
                      {transaction.formattedValue}
                    </td>
                    <td>{transaction.category.title}</td>
                    <td>{transaction.formattedDate}</td>
                    <td className="actions">
                      <Link to={`/edit/${transaction.id}`}>
                        <FiEdit size={20} color="#ffa45f" />
                      </Link>
                      <Link to="/delete">
                        <FiTrash2 color="#e83f5b" size={20} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
