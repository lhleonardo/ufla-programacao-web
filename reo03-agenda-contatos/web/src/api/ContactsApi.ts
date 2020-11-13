import axios from "axios";
import Contact from "../models/Contact";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

interface ICreateContact {
  name: string;
  nickname: string;
  phone: string;
}

interface IFilterOptions {
  [key: string]: string;
}

interface IUpdateContact {
  id: string;
  data: Omit<Contact, "id">;
}

export default class ContactsApi {
  async store({ name, nickname, phone }: ICreateContact): Promise<Contact> {
    const response = await api.post<Contact>("/contacts", {
      name,
      nickname,
      phone,
    });

    return response.data;
  }

  async find(filter: IFilterOptions): Promise<Contact[]> {
    const response = await api.get<Contact[]>("/contacts", {
      params: filter ? filter : {},
    });

    return response.data;
  }

  async update({ id, data }: IUpdateContact): Promise<Contact> {
    const response = await api.put<Contact>(`/contacts/${id}`, data);

    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/contacts/${id}`);
  }
}
