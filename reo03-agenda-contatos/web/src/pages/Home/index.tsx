import React, { useCallback, useEffect, useState } from "react";
import api from "../../api/ContactsApi";
import CreateContactModal from "../../components/CreateContactModal";
import Contact from "../../models/Contact";

import { FiSearch } from "react-icons/fi";

import {
  Container,
  Header,
  MainContent,
  ContentInfo,
  ContactsContainer,
  ContactItem,
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
  } else if (separatedName.length === 2) {
    icon = separatedName[0].charAt(0) + separatedName[1].charAt(0);
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

  const [formOpened, setFormOpened] = useState(false);
  const toggleForm = useCallback(() => setFormOpened(!formOpened), [
    formOpened,
  ]);

  const addNewContact = useCallback(
    async ({ nickname, phone, name }: Omit<Contact, "id">) => {
      const response = await api.store({ nickname, phone, name });

      const newContact = generateIconForContact(response);

      setContacts((oldContacts) => [...oldContacts, newContact]);
    },
    []
  );

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
            <AddButton onClick={() => toggleForm()}>+</AddButton>
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

        <ContactsContainer>
          {contacts.map((contact) => (
            <ContactItem key={contact.id}>
              <ContactItemAvatar>{contact.iconText}</ContactItemAvatar>
              <Divider />
              <div className="details">
                <h3>{contact.name}</h3>
                <h4>{contact.nickname}</h4>
                <span>{contact.phone}</span>
              </div>
            </ContactItem>
          ))}
        </ContactsContainer>
      </MainContent>

      <CreateContactModal
        isOpen={formOpened}
        toggleOpen={toggleForm}
        handleSubmit={(data) => addNewContact(data)}
      />
    </Container>
  );
};

export default Home;
