import React, { useCallback } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";

import { Content, Form } from "./styles";
import { Input } from "../../components/Input";
import { useCarsContext } from "../../providers/CarProvider";
import { useHistory } from "react-router-dom";

export const CreateCar: React.FC = () => {
  const { add } = useCarsContext();

  const { goBack } = useHistory();

  const submitForm = useCallback(
    (event: any) => {
      event.preventDefault();

      add({
        brand: event.target.brand.value,
        imageUrl: event.target.imageUrl.value,
        model: event.target.model.value,
        year: event.target.year.value,
      });

      goBack();
    },
    [add, goBack]
  );
  return (
    <Container>
      <Header />

      <Content>
        <h3>Cadastro de carro</h3>

        <Form onSubmit={submitForm} method="POST" action="#">
          <Input
            required
            name="brand"
            type="text"
            label="Marca do veículo"
            placeholder="Ex: Toyota"
          />
          <Input
            required
            name="model"
            type="text"
            label="Modelo do veículo"
            placeholder="Ex: Corolla"
          />
          <Input
            required
            name="year"
            type="number"
            label="Ano do veículo"
            placeholder="Ex: 2020"
          />
          <Input
            required
            name="imageUrl"
            type="url"
            label="Imagem do veículo (link)"
            placeholder="Insira uma url válida aqui"
          />

          <button type="submit">Adicionar</button>
        </Form>
      </Content>
      <Footer />
    </Container>
  );
};
