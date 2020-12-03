import Contact from "../models/Contact";
import IContactRepository from "../repositories/IContactRepository";

interface ICreateContactRequest {
  contact: Omit<Contact, "id">;
}

export default class CreateContactService {
  constructor(private repository: IContactRepository) {}

  public async execute({ contact }: ICreateContactRequest): Promise<Contact> {
    const created = await this.repository.insert(contact);

    return created;
  }
}
