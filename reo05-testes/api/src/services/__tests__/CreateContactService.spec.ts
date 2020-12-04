import FakeContactRepository from "../../repositories/FakeContactRepository";
import IContactRepository from "../../repositories/IContactRepository";
import CreateContactService from "../CreateContactService";

let fakeRepository: IContactRepository;
let createContact: CreateContactService;

describe("CreateContactService", () => {
  beforeEach(() => {
    fakeRepository = new FakeContactRepository();
    createContact = new CreateContactService(fakeRepository);
  });

  it("Deve criar um contato corretamente", async () => {
    const createdContact = await createContact.execute({
      contact: {
        name: "Leonardo Braz",
        address: "Rua de Exemplo",
        cep: "123123-123",
        city: "Teste",
        neighborhood: "Teste",
        nickname: "Leo",
        number: "1234",
        phone: "1234-1234",
        state: "RO",
      },
    });

    expect(createdContact).toHaveProperty("id");
  });
});
