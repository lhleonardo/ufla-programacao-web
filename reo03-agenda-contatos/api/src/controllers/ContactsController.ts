import { Request, Response } from "express";
import database from "../database";

class ContactsController {
  async index(req: Request, res: Response): Promise<Response> {
    const response = await database("contacts").select();
    console.log("buscados");
    return res.json(response);
  }
}

export default ContactsController;
