import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import alert from '../../assets/alert.svg';
import Header from '../../components/Header';
import api from '../../services/api';

import { AxiosError } from 'axios';

import Swal from 'sweetalert2';

import {
  Container,
  Footer,
  FormContainer,
  ImportFileContainer,
  Input,
  InputGroup,
  InputLabel,
  Title,
} from './styles';

interface Transaction {
  id: string;
  title: string;
  category: {
    id: string;
    title: string;
  };
}

interface EditTransactionRouteParams {
  id: string;
}

const EditTransaction: React.FC = () => {
  const history = useHistory();
  const { id } = useParams() as EditTransactionRouteParams;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransaction() {
      const response = await api.get<Transaction>(`/transactions/${id}`);

      setLoading(false);
      setTransaction(response.data);
    }

    loadTransaction();
  }, [id]);

  const formSubmit = useCallback(
    async evt => {
      try {
        evt.preventDefault();

        const data: Omit<Transaction, 'type' | 'value'> = {
          id,
          title: evt.target.title.value,
          category: evt.target.category.value,
        };

        await api.put<Transaction>(`/transactions/${id}`, data);

        await Swal.fire(
          'Atualizado com sucesso!',
          'Clique no botão abaixo para ir a listagem',
          'success',
        );

        history.push('/');
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          await Swal.fire(
            'Falha ao cadastrar',
            axiosError.response.data.message,
            'error',
          );
        } else {
          await Swal.fire(
            'Algo de errado aconteceu',
            'O servidor está estranho... Tente novamente',
            'error',
          );
        }
      }
    },
    [history, id],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Editar dados da transação</Title>
        <ImportFileContainer>
          {loading && <span>Carregando...</span>}

          {transaction && (
            <FormContainer id="create-transaction" onSubmit={formSubmit}>
              <InputGroup>
                <InputLabel>Nome da transação</InputLabel>
                <Input
                  type="text"
                  name="title"
                  required
                  defaultValue={transaction.title}
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>Categoria</InputLabel>
                <Input
                  type="text"
                  name="category"
                  required
                  defaultValue={transaction.category.title}
                />
              </InputGroup>

              <Footer>
                <p>
                  <img src={alert} alt="Alert" />
                  Todos os campos são obrigatórios
                </p>
                <button type="submit">Salvar</button>
              </Footer>
            </FormContainer>
          )}
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default EditTransaction;
