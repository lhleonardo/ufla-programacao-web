import { Request, Response } from "express";

import { v4 as uuid } from "uuid";
import database from "../database";
import Contact from "../models/Contact";

class ContactsController {
  async index(req: Request, res: Response): Promise<Response> {
    const response = await database<Contact>("contacts").select<Contact[]>();
    return res.status(200).json(response);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, nickname } = req.body;

    const response = await database<Contact>("contacts")
      .insert({ id: uuid(), name, phone, nickname })
      .returning("*");

    return res.status(201).json(response[0]);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { contactId } = req.params;
    const { name, phone, nickname } = req.body;

    const data = await database<Contact>("contacts")
      .update({ name, nickname, phone })
      .where("id", contactId)
      .returning("*");

    return res.status(200).json(data[0]);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { contactId } = req.params;

    await database<Contact>("contacts").delete().where("id", contactId);

    return res.status(204).send();
  }
}

export default ContactsController;
