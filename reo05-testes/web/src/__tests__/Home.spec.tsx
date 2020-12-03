import React from "react";

import { render, waitFor } from "@testing-library/react";
import AxiosMock from "axios-mock-adapter";
import { axiosClient } from "../api/ContactsApi";
import Contact from "../models/Contact";
import Home from "../pages/Home";

const apiMock = new AxiosMock(axiosClient);

const staticValues: Contact[] = [
  {
    id: "c0532d1b-a2a0-47a8-85ff-aea42bb55f55",
    name: "Contact Name 1",
    nickname: "nickname-1",
    phone: "123456789",
    cep: "77777-777",
    address: "Rua Tal",
    neighborhood: "Bairro Tal",
    number: "14",
    city: "Lavras",
    state: "MG",
  },
  {
    id: "0e63b931-3286-4088-ba0c-019fea74e378",
    name: "Contact Name 2",
    nickname: "nickname-2",
    phone: "123456789",
    cep: "77777-777",
    address: "Rua Tal",
    neighborhood: "Bairro Tal",
    number: "2705",
    city: "Ji-Paraná",
    state: "RO",
  },
  {
    id: "122f087e-222e-46c0-9443-b00a7a54ef2b",
    name: "Contact Name 3",
    nickname: "nickname-3",
    phone: "123456789",
    cep: "77777-777",
    address: "Rua Tal",
    neighborhood: "Bairro Tal",
    number: "2000",
    city: "Ji-Paraná",
    state: "RO",
  },
  {
    id: "5af1740d-0309-40b3-b884-89e60d7fa607",
    name: "Contact Name 4",
    nickname: "nickname-4",
    phone: "123456789",
    cep: "77777-777",
    address: "Rua Tal",
    neighborhood: "Bairro Tal",
    number: "2700",
    city: "Ji-Paraná",
    state: "RO",
  },
  {
    id: "0cf5479a-28bb-48f8-84c3-bf3170b4a960",
    name: "Contact Name 5",
    nickname: "nickname-5",
    phone: "123456789",
    cep: "77777-777",
    address: "Rua Tal",
    neighborhood: "Bairro Tal",
    number: "2000",
    city: "Ji-Paraná",
    state: "RO",
  },
];

describe("Home Page", () => {
  it("Deve listar os elementos na tela", async () => {
    // cria mock com dados ficticios na chamada da requisição
    apiMock.onGet("/contacts").reply<Contact[]>(200, staticValues);

    const { getByTestId, getByText } = render(<Home />);

    await waitFor(() => expect(getByTestId("main-content")).toBeTruthy(), {
      timeout: 2000, // 2 segundos
    });

    expect(getByText("Contact Name 1")).toBeTruthy();
    expect(getByText("nickname-1")).toBeTruthy();

    expect(getByText("Contact Name 2")).toBeTruthy();
    expect(getByText("nickname-2")).toBeTruthy();

    expect(getByText("Contact Name 3")).toBeTruthy();
    expect(getByText("nickname-3")).toBeTruthy();

    expect(getByText("Contact Name 4")).toBeTruthy();
    expect(getByText("nickname-4")).toBeTruthy();

    expect(getByText("Contact Name 5")).toBeTruthy();
    expect(getByText("nickname-5")).toBeTruthy();
  });
});
