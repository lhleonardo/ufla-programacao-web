import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { CarInfo, Content, PageHeader } from "./styles";

import { FiChevronLeft } from "react-icons/fi";
import { useCarsContext } from "../../providers/CarProvider";

interface DetailsParams {
  id: string;
}

export const Details: React.FC = () => {
  const { id } = useParams<DetailsParams>();

  const { find } = useCarsContext();
  const { goBack } = useHistory();

  const existsCar = find(id);

  if (!existsCar) {
    // redirecionar para página de not found
    goBack();
  }

  const car = existsCar!;

  return (
    <Container>
      <Header />

      <Content>
        <PageHeader>
          <Link to="/">
            <FiChevronLeft size={24} color="#457b9d" />
          </Link>
          <h3>Detalhes do carro</h3>
        </PageHeader>

        <CarInfo>
          <img src={car.imageUrl} alt={car.model} />
          <div className="details">
            <span>
              Marca <strong>{car.brand}</strong>
            </span>
            <span>
              Modelo <strong>{car.model}</strong>
            </span>
            <span>
              Ano <strong>{car.year}</strong>
            </span>
            <div className="actions">
              <Link to={`/edit/${car.id}`} className="edit">
                Editar
              </Link>
              <button className="delete">Excluir</button>
            </div>
          </div>
        </CarInfo>
      </Content>

      <Footer />
    </Container>
  );
};
