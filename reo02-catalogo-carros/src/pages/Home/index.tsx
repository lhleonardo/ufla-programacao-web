import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useCarsContext } from "../../providers/CarProvider";
import { Container, PageInfo, CarsContainer, CarItem } from "./styles";

export const Home: React.FC = () => {
  const { cars } = useCarsContext();
  return (
    <Container>
      <Header />

      <main>
        <PageInfo>
          <h2>Listagem</h2>
          <button>Novo carro</button>
        </PageInfo>

        <CarsContainer>
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
