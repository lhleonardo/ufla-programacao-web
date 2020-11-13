import { Router } from "express";
import ContactsController from "../controllers/ContactsController";

const routes = Router();

const contactsController = new ContactsController();

routes.get("/contacts", contactsController.index);
routes.post("/contacts", contactsController.create);
routes.put("/contacts/:contactId", contactsController.update);
routes.delete("/contacts/:contactId", contactsController.delete);

export default routes;
