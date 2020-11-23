import Contact from "../models/Contact";

import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3333",
});

interface ICreateContact {
  name: string;
  nickname: string;
  phone: string;

  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  number: string | number;
}

interface IFilterOptions {
  [key: string]: string;
}

interface IUpdateContact {
  id: string;
  data: Omit<Contact, "id">;
}

class ContactsApi {
  async store({
    name,
    nickname,
    phone,
    address,
    cep,
    city,
    neighborhood,
    number,
    state,
  }: ICreateContact): Promise<Contact> {
    const response = await axiosClient.post<Contact>("/contacts", {
      name,
      nickname,
      phone,
      address,
      cep,
      city,
      neighborhood,
      number,
      state,
    });

    return response.data;
  }

  async find(filter: IFilterOptions): Promise<Contact[]> {
    const response = await axiosClient.get<Contact[]>("/contacts", {
      params: filter ? filter : {},
    });

    return response.data;
  }

  async update({
    id,
    data: {
      name,
      nickname,
      phone,
      address,
      cep,
      city,
      neighborhood,
      number,
      state,
    },
  }: IUpdateContact): Promise<Contact> {
    const response = await axiosClient.put<Contact>(`/contacts/${id}`, {
      name,
      nickname,
      phone,
      address,
      cep,
      city,
      neighborhood,
      number,
      state,
    });

    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axiosClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsApi();
