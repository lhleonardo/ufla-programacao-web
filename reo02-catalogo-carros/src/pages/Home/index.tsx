import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { useCarsContext } from "../../providers/CarProvider";
import { PageInfo, CarsContainer, CarItem } from "./styles";

const Empty: React.FC = () => <span>Nenhum carro foi cadastrado.</span>;

export const Home: React.FC = () => {
  const { cars } = useCarsContext();
  const { push } = useHistory();
  return (
    <Container>
      <Header />

      <main>
        <PageInfo>
          <h2>Listagem</h2>
          <Link to="/create">Novo carro</Link>
        </PageInfo>

        <CarsContainer>
          {cars.length === 0 && <Empty />}
          {cars.map((car) => (
            <CarItem key={car.id} onClick={() => push(`/details/${car.id}`)}>
              <img src={car.imageUrl} alt={`${car.brand}-${car.model}`} />
              <span>{car.brand}</span>
              <strong>
                {car.model} [{car.year}]
              </strong>
            </CarItem>
          ))}
        </CarsContainer>
      </main>

      <Footer />
    </Container>
  );
};
