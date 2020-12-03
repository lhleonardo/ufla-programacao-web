import Contact from "../models/Contact";
import IContactRepository from "../repositories/IContactRepository";

interface IUpdateContactRequest {
  contactId: string;
  data: Omit<Contact, "id">;
}

export default class UpdateContactService {
  constructor(private repository: IContactRepository) {}

  public async execute({
    contactId,
    data,
  }: IUpdateContactRequest): Promise<Contact> {
    const created = await this.repository.update(contactId, data);

    return created;
  }
}
