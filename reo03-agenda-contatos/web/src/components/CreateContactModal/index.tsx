import React, { useCallback } from "react";
import Modal from "../Modal";
import { Container, Form } from "./styles";

interface IHandleSubmitProps {
  name: string;
  nickname: string;
  phone: string;
}

interface ICreateContactModalProps {
  isOpen: boolean;
  toggleOpen: () => void;

  handleSubmit: (data: IHandleSubmitProps) => void;
}

const CreateContactModal: React.FC<ICreateContactModalProps> = ({
  isOpen,
  toggleOpen,
  handleSubmit,
}) => {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data: IHandleSubmitProps = {
        name: event.target.name.value,
        nickname: event.target.nickname.value,
        phone: event.target.phone.value,
      };

      handleSubmit(data);
      toggleOpen();
    },
    [handleSubmit, toggleOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={toggleOpen}>
      <Container>
        <h3>Cadastrar novo contato</h3>
        <hr />
        <Form onSubmit={onSubmit}>
          <label>
            Nome Completo
            <input type="text" name="name" required />
          </label>
          <label>
            Apelido
            <input type="text" name="nickname" required />
          </label>
          <label>
            Telefone
            <input type="phone" name="phone" required />
          </label>

          <button type="submit">Cadastrar</button>
        </Form>
      </Container>
    </Modal>
  );
};

export default CreateContactModal;
