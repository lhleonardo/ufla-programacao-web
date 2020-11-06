import React, { useCallback } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container } from "../../components/Container";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

import { CarInfo, Content, PageHeader } from "./styles";

import { FiChevronLeft } from "react-icons/fi";
import { useCarsContext } from "../../providers/CarProvider";
import Swal from "sweetalert2";

interface DetailsParams {
  id: string;
}

export const Details: React.FC = () => {
  const { id } = useParams<DetailsParams>();

  const { find, remove } = useCarsContext();
  const { push } = useHistory();

  const car = find(id);

  const deleteCar = useCallback(async () => {
    const response = await Swal.fire({
      title: "Você tem certeza?",
      text: "Isso removerá o carro permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (car) {
      if (response.isConfirmed) {
        remove(car?.id);

        push("/");
      }
    }
  }, [car, remove, push]);

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

        {car && (
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
                <button onClick={deleteCar} className="delete">
                  Excluir
                </button>
              </div>
            </div>
          </CarInfo>
        )}
      </Content>

      <Footer />
    </Container>
  );
};
