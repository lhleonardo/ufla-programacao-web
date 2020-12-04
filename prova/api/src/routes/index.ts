import { Router } from "express";

import TasksController from "../controllers/TasksController";

const routes = Router();

const tasksController = new TasksController();

routes.get("/tasks", tasksController.index);
routes.post("/tasks", tasksController.create);

export default routes;
