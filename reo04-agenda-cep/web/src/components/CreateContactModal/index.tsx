import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import { Container, Form } from "./styles";

import InputMask from "react-input-mask";
import CepSearchInput from "../CepSearch";

import { ICepApiResponse } from "../../api/CepApi";

interface IHandleSubmitProps {
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
  const [cepResult, setCepResult] = useState<ICepApiResponse>(
    {} as ICepApiResponse
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data: IHandleSubmitProps = {
        name: event.target.name.value,
        nickname: event.target.nickname.value,
        phone: event.target.phone.value,
        cep: event.target.cep.value,
        address: event.target.address.value,
        city: event.target.city.value,
        state: event.target.state.value,
        neighborhood: event.target.neighborhood.value,
        number: event.target.number.value,
      };

      handleSubmit(data);
      toggleOpen();
    },
    [handleSubmit, toggleOpen]
  );

  const handleCepIsFound = useCallback(
    ({ cep, street, city, state, neighborhood }: ICepApiResponse) =>
      setCepResult({ cep, street, city, state, neighborhood }),
    []
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
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              type="phone"
              alwaysShowMask
              required
            />
          </label>

          <CepSearchInput name="cep" handleCepIsFound={handleCepIsFound} />

          <div className="divider">
            <label>
              Endereço
              <input
                name="address"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult.street || ""}
              />
            </label>

            <label>
              Número
              <input
                name="number"
                type="text"
                readOnly={!cepResult}
                placeholder={
                  cepResult ? "Ex: 14A" : "Pesquise o CEP para continuar"
                }
              />
            </label>
          </div>

          <div className="divider">
            <label className="divider">
              Cidade
              <input
                name="city"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult.city || ""}
              />
            </label>
            <label>
              Estado
              <input
                name="state"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult.state || ""}
              />
            </label>
            <label>
              Bairro
              <input
                name="neighborhood"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult.neighborhood || ""}
              />
            </label>
          </div>
          <button type="submit">Cadastrar</button>
        </Form>
      </Container>
    </Modal>
  );
};

export default CreateContactModal;
