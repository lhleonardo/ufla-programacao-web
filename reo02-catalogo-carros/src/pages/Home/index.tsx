import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { useCarsContext } from "../../providers/CarProvider";
import { PageInfo, CarsContainer, CarItem } from "./styles";

const Empty: React.FC = () => <span>Nenhum carro foi cadastrado.</span>;

export const Home: React.FC = () => {
  const { cars } = useCarsContext();
  return (
    <Container>
      <Header />

      <main>
        <PageInfo>
          <h2>Listagem</h2>
          {/* <button>Novo carro</button> */}
          <Link to="/create">Novo carro</Link>
        </PageInfo>

        <CarsContainer>
          {cars.length === 0 && <Empty />}
          {cars.map((car) => (
            <CarItem id={car.id}>
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
