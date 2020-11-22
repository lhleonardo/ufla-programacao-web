import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import ContactsController from "../controllers/ContactsController";

const routes = Router();

const contactsController = new ContactsController();

routes.get("/contacts", contactsController.index);
routes.post(
  "/contacts",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      phone: Joi.string().required(),
      cep: Joi.string(),
      address: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  contactsController.create
);
routes.put(
  "/contacts/:contactId",
  celebrate({
    [Segments.PARAMS]: {
      contactId: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      nickname: Joi.string().required(),
      phone: Joi.string().required(),
      cep: Joi.string(),
      address: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  }),
  contactsController.update
);
routes.delete(
  "/contacts/:contactId",
  celebrate({
    [Segments.PARAMS]: {
      contactId: Joi.string().uuid().required(),
    },
  }),
  contactsController.delete
);

export default routes;
