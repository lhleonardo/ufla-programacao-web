import { v4 as uuid } from "uuid";

import database from "../database";
import Contact from "../models/Contact";
import IContactRepository, { IListContactParams } from "./IContactRepository";

class ContactRepository implements IContactRepository {
  public async list(params: IListContactParams): Promise<Contact[]> {
    if (!params) {
      const response = await database<Contact>("contacts").select<Contact[]>();
      return response;
    }

    const contacts = await database<Contact>("contacts")
      .select("*")
      .where(params.operator, "ilike", `%${params.value}%`);

    return contacts;
  }

  public async insert({
    name,
    phone,
    nickname,
    cep,
    address,
    number,
    neighborhood,
    city,
    state,
  }: Omit<Contact, "id">): Promise<Contact> {
    const response = await database<Contact>("contacts")
      .insert({
        id: uuid(),
        name,
        phone,
        nickname,
        cep,
        address,
        number,
        neighborhood,
        city,
        state,
      })
      .returning("*");

    return response[0];
  }

  public async update(
    contactId: string,
    {
      name,
      nickname,
      phone,
      cep,
      address,
      number,
      neighborhood,
      city,
      state,
    }: Omit<Contact, "id">
  ): Promise<Contact> {
    const response = await database<Contact>("contacts")
      .update({
        name,
        nickname,
        phone,
        cep,
        address,
        number,
        neighborhood,
        city,
        state,
      })
      .where("id", contactId)
      .returning("*");

    return response[0];
  }

  public async delete(contactId: string): Promise<void> {
    await database<Contact>("contacts").delete().where("id", contactId);
  }
}

export default ContactRepository;
