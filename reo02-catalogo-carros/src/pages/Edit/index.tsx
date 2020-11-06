import React, { useCallback, useMemo } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";

import { Content, Form } from "./styles";
import { Input } from "../../components/Input";
import { useHistory, useParams } from "react-router-dom";
import { useCarsContext } from "../../providers/CarProvider";
import Swal from "sweetalert2";

interface EditCarRouteParams {
  id: string;
}

export const EditCar: React.FC = () => {
  const { id } = useParams<EditCarRouteParams>();
  const { find, update } = useCarsContext();
  const car = useMemo(() => find(id), [id, find]);

  const history = useHistory();

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault();

      const data = {
        brand: event.target.brand.value,
        model: event.target.model.value,
        year: event.target.year.value,
        imageUrl: event.target.imageUrl.value,
      };

      update(id, data);

      await Swal.fire("Tudo certo!", "Os dados foram atualizados", "success");

      history.push("/");
    },
    [id, update, history]
  );

  return (
    <Container>
      <Header />

      <Content>
        <h3>Editar informações do carro</h3>

        <Form onSubmit={submitForm} method="POST" action="#">
          <Input
            required
            name="brand"
            type="text"
            label="Marca do veículo"
            placeholder="Ex: Toyota"
            defaultValue={car?.brand}
          />
          <Input
            required
            defaultValue={car?.model}
            name="model"
            type="text"
            label="Modelo do veículo"
            placeholder="Ex: Corolla"
          />
          <Input
            required
            defaultValue={car?.year}
            name="year"
            type="number"
            label="Ano do veículo"
            placeholder="Ex: 2020"
          />
          <Input
            required
            defaultValue={car?.imageUrl}
            name="imageUrl"
            type="url"
            label="Imagem do veículo (link)"
            placeholder="Insira uma url válida aqui"
          />

          <button type="submit">Atualizar informações</button>
        </Form>
      </Content>
      <Footer />
    </Container>
  );
};
