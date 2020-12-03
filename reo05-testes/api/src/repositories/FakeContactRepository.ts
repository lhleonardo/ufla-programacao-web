import { v4 as uuid } from "uuid";

import Contact from "../models/Contact";
import IContactRepository, { IListContactParams } from "./IContactRepository";

export default class FakeContactRepository implements IContactRepository {
  private data: Contact[] = [];

  public async list(params: IListContactParams): Promise<Contact[]> {
    if (params) {
      const filtered = this.data.filter((contact) => {
        return contact[params.operator] === params.value;
      });

      return filtered;
    }

    return this.data;
  }

  public async insert(data: Omit<Contact, "id">): Promise<Contact> {
    const contact: Contact = {
      ...data,
      id: uuid(),
    };
    this.data.push(contact);

    return contact;
  }

  public async update(
    contactId: string,
    data: Omit<Contact, "id">
  ): Promise<Contact> {
    const index = this.data.findIndex((contact) => contact.id === contactId);

    const newContact = { ...data, id: contactId };
    this.data[index] = newContact;

    return newContact;
  }

  public async delete(contactId: string): Promise<void> {
    const index = this.data.findIndex((contact) => contact.id === contactId);

    this.data.splice(index, 1);
  }
}
