import { Request, Response } from "express";
import database from "../database";
import Task from "../models/Task";

import { v4 as uuid } from "uuid";

export default class TasksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const tasks = await database<Task>("tasks").select<Task[]>();

    return response.status(200).json(tasks);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createdTask = await database<Task>("tasks")
      .insert({
        id: uuid(),
        description,
        name,
      })
      .returning("*");

    return response.status(200).json({ task: createdTask[0] });
  }
}
