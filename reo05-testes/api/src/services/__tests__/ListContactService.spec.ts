import FakeContactRepository from "../../repositories/FakeContactRepository";
import IContactRepository from "../../repositories/IContactRepository";
import ListContactService from "../ListContactService";

let fakeRepository: IContactRepository;
let listContact: ListContactService;

describe("CreateContactService", () => {
  beforeEach(() => {
    fakeRepository = new FakeContactRepository();
    listContact = new ListContactService(fakeRepository);
  });

  it("Deve listar os contatos cadastrados", async () => {
    await fakeRepository.insert({
      name: "Leonardo Braz",
      address: "Rua de Exemplo",
      cep: "123123-123",
      city: "Teste",
      neighborhood: "Teste",
      nickname: "Leo",
      number: "1234",
      phone: "1234-1234",
      state: "RO",
    });
    await fakeRepository.insert({
      name: "Pedro Castro",
      nickname: "Pedro",
      address: "Rua de Exemplo",
      cep: "123123-123",
      city: "Teste",
      neighborhood: "Teste",
      number: "1234",
      phone: "1234-1234",
      state: "RO",
    });
    await fakeRepository.insert({
      name: "Maria Beatriz",
      nickname: "Bia",
      address: "Rua de Exemplo",
      cep: "123123-123",
      city: "Teste",
      neighborhood: "Teste",
      number: "1234",
      phone: "1234-1234",
      state: "RO",
    });

    const contacts = await listContact.execute({});
  });
});
