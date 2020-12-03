import { Request, Response } from "express";
import database from "../database";

import Contact from "../models/Contact";
import ManagerContact from "../services/ManagerContact";

class ContactsController {
  private manager: ManagerContact;

  constructor() {
    this.manager = new ManagerContact();
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { operator, value } = req.query;

    if (
      operator !== "phone" &&
      operator !== "nickname" &&
      operator !== "name"
    ) {
      return res.status(400).json({ message: "Invalid operator for search." });
    }

    if (!value) {
      return res
        .status(400)
        .json({ message: "The value of search is required." });
    }

    const contacts = await this.manager.list({
      operator,
      value: value as string,
    });

    return res.status(200).json(contacts);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      phone,
      nickname,
      cep,
      address,
      number,
      neighborhood,
      city,
      state,
    } = req.body;

    const response = await this.manager.create({
      name,
      phone,
      nickname,
      cep,
      address,
      number,
      neighborhood,
      city,
      state,
    });

    return res.status(201).json(response);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { contactId } = req.params;
    const {
      name,
      phone,
      nickname,
      cep,
      address,
      number,
      neighborhood,
      city,
      state,
    } = req.body;

    const response = await this.manager.update(contactId, {
      name,
      phone,
      nickname,
      cep,
      address,
      number,
      neighborhood,
      city,
      state,
    });

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { contactId } = req.params;

    await database<Contact>("contacts").delete().where("id", contactId);

    return res.status(204).send();
  }
}

export default ContactsController;
