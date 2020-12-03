import { Request, Response } from "express";
import Contact from "../models/Contact";
import ContactRepository from "../repositories/ContactRepository";

import CreateContactService from "../services/CreateContactService";
import DeleteContactService from "../services/DeleteContactService";
import ListContactService from "../services/ListContactService";
import UpdateContactService from "../services/UpdateContactService";

class ContactsController {
  async index(req: Request, res: Response): Promise<Response> {
    const { operator, value } = req.query;

    const repository = new ContactRepository();
    const listContacts = new ListContactService(repository);

    const searchConfig = operator
      ? {
          params: {
            operator: operator as keyof Contact,
            value: value as string,
          },
        }
      : {};

    const contacts = await listContacts.execute(searchConfig);

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

    const repository = new ContactRepository();
    const createContactService = new CreateContactService(repository);

    const response = await createContactService.execute({
      contact: {
        name,
        phone,
        nickname,
        cep,
        address,
        number,
        neighborhood,
        city,
        state,
      },
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

    const repository = new ContactRepository();
    const updateContactService = new UpdateContactService(repository);

    const response = await updateContactService.execute({
      contactId,
      data: {
        name,
        phone,
        nickname,
        cep,
        address,
        number,
        neighborhood,
        city,
        state,
      },
    });

    return res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { contactId } = req.params;

    const repository = new ContactRepository();
    await new DeleteContactService(repository).execute({ contactId });

    return res.status(204).send();
  }
}

export default new ContactsController();
