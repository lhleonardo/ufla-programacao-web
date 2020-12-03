import { Request, Response } from "express";

import IContactRepository from "../repositories/IContactRepository";
import CreateContactService from "../services/CreateContactService";
import DeleteContactService from "../services/DeleteContactService";
import ListContactService from "../services/ListContactService";
import UpdateContactService from "../services/UpdateContactService";

class ContactsController {
  constructor(private repository: IContactRepository) {}

  async index(req: Request, res: Response): Promise<Response> {
    const { operator, value } = req.query;

    const listContacts: ListContactService = new ListContactService(
      this.repository
    );

    const contacts = await listContacts.execute({
      operator: operator as string,
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

    const createContactService = new CreateContactService(this.repository);

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

    const updateContactService = new UpdateContactService(this.repository);

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

    await new DeleteContactService(this.repository).execute({ contactId });

    return res.status(204).send();
  }
}

export default ContactsController;
