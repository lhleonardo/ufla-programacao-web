import React, { useCallback } from "react";
import Modal from "../Modal";
import { Container, Form } from "./styles";

interface IContactData {
  id: string;
  name: string;
  nickname: string;
  phone: string;

  cep: string;
  address: string;
  number: string | number;
  neighborhood: string;
  city: string;
  state: string;
}

interface IEditContactModalProps {
  initialData: IContactData | null;
  isOpen: boolean;
  toggleOpen: () => void;

  handleSubmit: (data: IContactData) => void;
}

const EditContactModal: React.FC<IEditContactModalProps> = ({
  isOpen,
  toggleOpen,
  handleSubmit,
  initialData,
}) => {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data: IContactData = {
        id: initialData!!.id,
        name: event.target.name.value,
        nickname: event.target.nickname.value,
        phone: event.target.phone.value,
        cep: event.target.cep.value,
        address: event.target.address.value,
        number: event.target.number.value,
        neighborhood: event.target.neighborhood.value,
        city: event.target.city.value,
        state: event.target.state.value,
      };

      handleSubmit(data);
      toggleOpen();
    },
    [handleSubmit, toggleOpen, initialData]
  );

  return (
    initialData && (
      <Modal isOpen={isOpen} setIsOpen={toggleOpen}>
        <Container>
          <h3>Editar os dados</h3>
          <hr />
          <Form onSubmit={onSubmit}>
            <label>
              Nome Completo
              <input
                defaultValue={initialData.name}
                type="text"
                name="name"
                required
              />
            </label>
            <label>
              Apelido
              <input
                defaultValue={initialData.nickname}
                type="text"
                name="nickname"
                required
              />
            </label>
            <label>
              Telefone
              <input
                defaultValue={initialData.phone}
                type="phone"
                name="phone"
                required
              />
            </label>

            <button type="submit">Atualizar</button>
          </Form>
        </Container>
      </Modal>
    )
  );
};

export default EditContactModal;
