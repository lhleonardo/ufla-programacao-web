import Contact from "../models/Contact";

export interface IListContactParams {
  operator:
    | "id"
    | "name"
    | "phone"
    | "nickname"
    | "cep"
    | "address"
    | "neighborhood"
    | "number"
    | "state"
    | "city";
  value: string;
}

export default interface IContactRepository {
  list(params: IListContactParams): Promise<Contact[]>;
  insert(data: Omit<Contact, "id">): Promise<Contact>;
  update(contactId: string, data: Omit<Contact, "id">): Promise<Contact>;
  delete(contactId: string): Promise<void>;
}
