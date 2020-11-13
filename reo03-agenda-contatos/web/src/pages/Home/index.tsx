import React from "react";
import Contact from "../../models/Contact";
import {
  Container,
  Header,
  MainContent,
  ContentInfo,
  ContactsContainer,
  ContactItem,
  ContactItemAvatar,
  Divider,
} from "./styles";

interface IContactType extends Contact {
  iconText: string;
}

const Home: React.FC = () => {
  const contacts: IContactType[] = [
    {
      id: "1",
      name: "Leonardo Henrique de Braz",
      nickname: "Leonardo",
      phone: "123123123123",
      iconText: "LH",
    },
    {
      id: "2",
      name: "Leo Braz de Souza",
      nickname: "Leo",
      phone: "123123123123",
      iconText: "LB",
    },
    {
      id: "3",
      name: "Rosimeire Braz",
      nickname: "Rosi",
      phone: "123123123123",
      iconText: "RB",
    },
    {
      id: "4",
      name: "Gabrielle Almeida Cuba",
      nickname: "Gabi",
      phone: "123123123123",
      iconText: "RB",
    },
    {
      id: "5",
      name: "Leonardo Henrique de Braz",
      nickname: "Leonardo",
      phone: "123123123123",
      iconText: "LH",
    },
    {
      id: "6",
      name: "Leo Braz de Souza",
      nickname: "Leo",
      phone: "123123123123",
      iconText: "LB",
    },
    {
      id: "7",
      name: "Rosimeire Braz",
      nickname: "Rosi",
      phone: "123123123123",
      iconText: "RB",
    },
    {
      id: "8",
      name: "Gabrielle Almeida Cuba",
      nickname: "Gabi",
      phone: "123123123123",
      iconText: "RB",
    },
  ];
  return (
    <Container>
      <Header>
        <h1>Agenda Telefônica</h1>
      </Header>

      <MainContent>
        <ContentInfo>
          <h2>Busque pelos seus contatos</h2>
          <form>
            <select>
              <option>Nome</option>
              <option>Apelido</option>
              <option>Telefone</option>
            </select>
            <input type="text" />
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
    </Container>
  );
};

export default Home;
