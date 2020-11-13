import { Router } from "express";
import ContactsController from "./controllers/ContactsController";

const routes = Router();

const contactsController = new ContactsController();

routes.get("/contacts", contactsController.index);

export default routes;
