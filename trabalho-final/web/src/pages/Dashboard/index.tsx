import { compareAsc } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiEdit, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import dislike from '../../assets/dislike.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import Header from '../../components/Header';
import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import {
  Card,
  CardContainer,
  Container,
  Empty,
  TableContainer,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { id: string; title: string };
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

interface OrderBy {
  value: 'id' | 'title' | 'category' | 'value' | 'createdAt';
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const [orderBy, setOrderBy] = useState<OrderBy>({ value: 'id' });

  const revalidateBalance = useCallback(async () => {
    const response = await api.get<Pick<ApiResponse, 'balance'>>(
      '/transactions',
    );

    return response.data.balance;
  }, []);

  const handleDelete = useCallback((id, title) => {
    async function deleteTransaction() {
      const response = await Swal.fire({
        title: 'Você tem certeza?',
        text: `A transação "${title}" será apagada permanentemente.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, eu quero!',
        cancelButtonText: 'Cancelar',
      });

      if (response.isConfirmed) {
        await api.delete(`/transactions/${id}`);

        const newBalance = await revalidateBalance();

        setTransactions(currentState => {
          return currentState.filter(transaction => transaction.id !== id);
        });
        setBalance({
          income: formatValue(newBalance.income),
          outcome: formatValue(newBalance.outcome),
          total: formatValue(newBalance.total),
        });

        await Swal.fire('Pronto!', 'A transação foi excluída!', 'success');
      }
    }

    deleteTransaction();
  }, []);

  const handleSortChange = useCallback(
    (option: OrderBy) => {
      if (orderBy.value === option.value) {
        setOrderBy({ value: 'id' });
      } else {
        setOrderBy(option);
      }
    },
    [orderBy],
  );

  const transactionsSorted = useMemo(() => {
    const data: Transaction[] = ([] as Transaction[]).concat(transactions);

    switch (orderBy.value) {
      case 'category':
        data.sort((a, b) => {
          if (
            a.category.title.toLocaleLowerCase() <
            b.category.title.toLocaleLowerCase()
          ) {
            return -1;
          }
          if (
            a.category.title.toLocaleLowerCase() >
            b.category.title.toLocaleLowerCase()
          ) {
            return 1;
          }
          return 0;
        });

        break;
      case 'createdAt': {
        data.sort((a, b) => {
          return compareAsc(a.createdAt, b.createdAt);
        });
        break;
      }
      case 'title': {
        data.sort((a, b) => {
          if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
            return -1;
          }
          if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
            return 1;
          }
          return 0;
        });
        break;
      }

      case 'value': {
        data.sort((a, b) => {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        });
        break;
      }

      default:
        break;
    }

    return data;
  }, [transactions, orderBy]);

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
          {transactionsSorted.length === 0 && (
            <Empty>
              <img src={dislike} alt="Dislike" />
              <span>Você ainda não registrou nenhuma transação</span>
            </Empty>
          )}

          {transactionsSorted.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>
                    Título
                    <button
                      onClick={() => handleSortChange({ value: 'title' })}
                    >
                      {orderBy.value === 'title' ? (
                        <FiChevronUp color="#ff872c" />
                      ) : (
                        <FiChevronDown />
                      )}
                    </button>
                  </th>
                  <th>
                    Preço
                    <button
                      onClick={() => handleSortChange({ value: 'value' })}
                    >
                      {orderBy.value === 'value' ? (
                        <FiChevronUp color="#ff872c" />
                      ) : (
                        <FiChevronDown />
                      )}
                    </button>
                  </th>
                  <th>
                    Categoria
                    <button
                      onClick={() => handleSortChange({ value: 'category' })}
                    >
                      {orderBy.value === 'category' ? (
                        <FiChevronUp color="#ff872c" />
                      ) : (
                        <FiChevronDown />
                      )}
                    </button>
                  </th>
                  <th>
                    Data
                    <button
                      onClick={() => handleSortChange({ value: 'createdAt' })}
                    >
                      {orderBy.value === 'createdAt' ? (
                        <FiChevronUp color="#ff872c" />
                      ) : (
                        <FiChevronDown />
                      )}
                    </button>
                  </th>
                  <th>Ações</th>
                </tr>
              </thead>

              <tbody>
                {transactionsSorted.map(transaction => (
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
                      <button
                        onClick={() =>
                          handleDelete(transaction.id, transaction.title)
                        }
                      >
                        <FiTrash2 color="#e83f5b" size={20} />
                      </button>
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
