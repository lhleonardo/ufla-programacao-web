import React, { useCallback, useEffect, useState } from "react";
import Modal from "../Modal";
import { Container, Form } from "./styles";

import InputMask from "react-input-mask";
import CepSearchInput from "../CepSearch";

import { ICepApiResponse } from "../../api/CepApi";

interface IContact {
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

interface IContactExists extends IContact {
  id: string;
}

interface IPersistContactModalProps {
  isOpen: boolean;
  toggleOpen: () => void;

  handleCreateContact?: (data: IContact) => void;
  handleUpdateContact?: (data: IContact & { id: string }) => void;

  initialData?: IContactExists;
}

const PersistContactModal: React.FC<IPersistContactModalProps> = ({
  isOpen,
  toggleOpen,
  handleCreateContact = () => {
    throw new Error("Not implemented yet.");
  },
  handleUpdateContact = () => {
    throw new Error("Not implemented yet.");
  },
  initialData,
}) => {
  const [cepResult, setCepResult] = useState<ICepApiResponse>(
    {} as ICepApiResponse
  );

  const handleCepIsFound = useCallback(
    ({ cep, street, city, state, neighborhood }: ICepApiResponse) =>
      setCepResult({ cep, street, city, state, neighborhood }),
    []
  );

  useEffect(() => {
    if (!isOpen) {
      setCepResult({} as ICepApiResponse);
    }
  }, [isOpen]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const data: IContact | IContactExists = Object.assign(
        {
          name: event.target.name.value,
          nickname: event.target.nickname.value,
          phone: event.target.phone.value,
          cep: event.target.cep.value,
          address: event.target.address.value,
          city: event.target.city.value,
          state: event.target.state.value,
          neighborhood: event.target.neighborhood.value,
          number: event.target.number.value,
        },
        initialData ? { id: initialData.id } : {}
      );

      if (initialData) {
        handleUpdateContact(data as IContactExists);
      } else {
        handleCreateContact(data as IContact);
      }

      toggleOpen();
    },
    [handleCreateContact, handleUpdateContact, initialData, toggleOpen]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={toggleOpen}>
      <Container>
        <h3>Cadastrar novo contato</h3>
        <hr />
        <Form onSubmit={onSubmit}>
          <label>
            Nome Completo
            <input
              type="text"
              name="name"
              required
              defaultValue={initialData?.name}
            />
          </label>
          <label>
            Apelido
            <input
              type="text"
              name="nickname"
              required
              defaultValue={initialData?.nickname}
            />
          </label>
          <label>
            Telefone
            <InputMask
              mask="(99) 99999-9999"
              name="phone"
              type="phone"
              alwaysShowMask
              required
              defaultValue={initialData?.phone}
            />
          </label>

          <CepSearchInput
            name="cep"
            handleCepIsFound={handleCepIsFound}
            defaultValue={initialData?.cep}
          />

          <div className="divider">
            <label>
              Endereço
              <input
                name="address"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult.street || undefined}
                defaultValue={cepResult?.street || initialData?.address || ""}
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
                defaultValue={initialData?.number || ""}
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
                value={cepResult?.city || undefined}
                defaultValue={cepResult?.city || initialData?.city || ""}
              />
            </label>
            <label>
              Estado
              <input
                name="state"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult?.state || undefined}
                defaultValue={cepResult?.state || initialData?.state || ""}
              />
            </label>
            <label>
              Bairro
              <input
                name="neighborhood"
                type="text"
                readOnly
                placeholder="Pesquise o CEP para continuar"
                value={cepResult?.neighborhood || undefined}
                defaultValue={
                  cepResult?.neighborhood || initialData?.neighborhood || ""
                }
              />
            </label>
          </div>
          <button type="submit">
            {initialData ? "Atualizar" : "Cadastrar"}
          </button>
        </Form>
      </Container>
    </Modal>
  );
};

export default PersistContactModal;
