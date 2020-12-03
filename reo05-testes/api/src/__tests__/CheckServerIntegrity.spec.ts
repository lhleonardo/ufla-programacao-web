import request from "supertest";

import app from "../app";

describe("Verificação de integridade do server", () => {
  it("Deve responder a uma determinada rota", async () => {
    const response = await request(app).get("/contacts");

    expect(response.status).toEqual(200);
  });
});
