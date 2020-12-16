import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
  Select,
  Title,
} from './styles';

interface Transaction {
  title: string;
  category: string;
  type: 'income' | 'outcome';
  value: number;
}

const EditTransaction: React.FC = () => {
  const history = useHistory();
  const formSubmit = useCallback(
    async evt => {
      try {
        evt.preventDefault();

        const data: Transaction = {
          title: evt.target.title.value,
          category: evt.target.category.value,
          type: evt.target.type.value,
          value: evt.target.moneyValue.value,
        };

        await api.post<Transaction>('/transactions', data);

        await Swal.fire(
          'Salvo com sucesso!',
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
    [history],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Nova Transação</Title>
        <ImportFileContainer>
          <FormContainer id="create-transaction" onSubmit={formSubmit}>
            <InputGroup>
              <InputLabel>Nome da transação</InputLabel>
              <Input type="text" name="title" required />
            </InputGroup>
            <InputGroup>
              <InputLabel>Valor (R$)</InputLabel>
              <Input type="number" name="moneyValue" min="0" required />
            </InputGroup>
            <InputGroup>
              <InputLabel>Tipo de transação</InputLabel>
              <Select name="type" required>
                <option value="income">Entrada</option>
                <option value="outcome">Saída</option>
              </Select>
            </InputGroup>
            <InputGroup>
              <InputLabel>Categoria</InputLabel>
              <Input type="text" name="category" required />
            </InputGroup>

            <Footer>
              <p>
                <img src={alert} alt="Alert" />
                Todos os campos são obrigatórios
              </p>
              <button type="submit">Salvar</button>
            </Footer>
          </FormContainer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default EditTransaction;
