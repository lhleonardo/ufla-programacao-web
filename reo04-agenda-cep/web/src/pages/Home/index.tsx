import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/ContactsApi";
import PersistContactModal from "../../components/PersistContactModal";
import Contact from "../../models/Contact";

import { FiSearch } from "react-icons/fi";

import Swal from "sweetalert2";

import {
  Container,
  Header,
  MainContent,
  ContentInfo,
  ContactsContainer,
  ContactItem,
  ContactItemContent,
  SelectedContactItem,
  ContactItemAvatar,
  Divider,
  AddButton,
} from "./styles";

interface IContactType extends Contact {
  iconText: string;
}

interface ISearchOptions {
  operator: string;
  value: string;
}

function generateIconForContact(contact: Contact): IContactType {
  const separatedName = contact.name.split(" ");

  let icon: string;

  if (separatedName.length === 1) {
    icon = separatedName[0].charAt(0);
  } else if (separatedName.length >= 2) {
    icon =
      separatedName[0].charAt(0) +
      separatedName[separatedName.length - 1].charAt(0);
  } else {
    icon = "?";
  }

  return {
    iconText: icon,
    ...contact,
  };
}

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<IContactType[]>([]);

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [isModalCreateContactOpened, setModalCreateContactOpened] = useState(
    false
  );
  const [isModalEditContactOpened, setModalEditContactOpened] = useState(false);

  const toggleModalCreateFormOpen = useCallback(
    () => setModalCreateContactOpened(!isModalCreateContactOpened),
    [isModalCreateContactOpened]
  );

  const toggleModalEditFormOpen = useCallback(
    () => setModalEditContactOpened(!isModalEditContactOpened),
    [isModalEditContactOpened]
  );

  const handleSubmitCreateContact = useCallback(
    async ({
      nickname,
      phone,
      name,
      address,
      cep,
      city,
      neighborhood,
      number,
      state,
    }: Omit<Contact, "id">) => {
      const response = await api.store({
        nickname,
        phone,
        name,
        address,
        cep,
        city,
        neighborhood,
        number,
        state,
      });

      const newContact = generateIconForContact(response);

      setContacts((oldContacts) => [...oldContacts, newContact]);
    },
    []
  );

  const handleSubmitEditContact = useCallback(async (data: Contact) => {
    const updatedContact = await api.update({ id: data.id, data });

    setContacts((currentContacts) => {
      return currentContacts.map((contact) =>
        contact.id === data.id
          ? generateIconForContact(updatedContact)
          : contact
      );
    });
  }, []);

  const handleSubmitDeleteContact = useCallback(async (id: string) => {
    const response = await Swal.fire({
      title: "Você tem certeza?",
      text: "Isso removerá o contato permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (response.isConfirmed) {
      await api.delete(id);

      setContacts((currentContacts) =>
        currentContacts.filter((contact) => contact.id !== id)
      );
    }
  }, []);

  // busca os dados na api
  const search = useCallback(async (event: any) => {
    event.preventDefault();

    const data: ISearchOptions = {
      operator: event.target.operator.value,
      value: event.target.value.value,
    };

    const findOptions = data.value ? data : {};

    const response = await api.find(findOptions);

    const contactsWithIcon = response.map<IContactType>(generateIconForContact);

    setContacts(contactsWithIcon);
  }, []);

  const onClickContact = useCallback((contact: IContactType) => {
    setSelectedContact(contact);
  }, []);

  // carrega os dados da api
  useEffect(() => {
    async function loadContacts() {
      const response = await api.find({});

      const contactsWithIcon = response.map<IContactType>(
        generateIconForContact
      );

      setContacts(contactsWithIcon);
    }

    loadContacts();
  }, []);
  return (
    <Container>
      <Header>
        <h1>Agenda Telefônica</h1>
      </Header>

      <MainContent>
        <ContentInfo>
          <div>
            <h2>Busque pelos seus contatos</h2>
            <AddButton onClick={() => toggleModalCreateFormOpen()}>+</AddButton>
          </div>
          <form onSubmit={search}>
            <select name="operator" required>
              <option value="name">Nome</option>
              <option value="nickname">Apelido</option>
              <option value="phone">Telefone</option>
            </select>
            <input
              type="text"
              placeholder="Digite sua pesquisa aqui"
              name="value"
            />
            <button type="submit">
              <FiSearch color="#121420" size={20} />
            </button>
          </form>
        </ContentInfo>

        <ContactsContainer type="crossfade">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              layoutId={contact.id}
              onClick={() => onClickContact(contact)}
            >
              <div className="logo">
                <ContactItemAvatar>{contact.iconText}</ContactItemAvatar>
                <Divider />
              </div>
              <ContactItemContent>
                <div className="details">
                  <h3>{contact.name}</h3>
                  <h4>{contact.nickname}</h4>
                  <span>{contact.phone}</span>
                </div>
                {selectedContact && selectedContact.id === contact.id && (
                  <SelectedContactItem>
                    <button
                      className="editar"
                      onClick={() => toggleModalEditFormOpen()}
                    >
                      Editar
                    </button>
                    <button
                      className="excluir"
                      onClick={() => handleSubmitDeleteContact(contact.id)}
                    >
                      Excluir
                    </button>
                  </SelectedContactItem>
                )}
              </ContactItemContent>
            </ContactItem>
          ))}
        </ContactsContainer>
      </MainContent>

      <PersistContactModal
        isOpen={isModalCreateContactOpened}
        toggleOpen={toggleModalCreateFormOpen}
        handleCreateContact={(data) => handleSubmitCreateContact(data)}
      />

      <PersistContactModal
        isOpen={isModalEditContactOpened}
        toggleOpen={toggleModalEditFormOpen}
        handleUpdateContact={(data) => handleSubmitEditContact(data)}
        initialData={selectedContact!!}
      />
    </Container>
  );
};

export default Home;
