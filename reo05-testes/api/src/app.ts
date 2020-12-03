import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import AppError from "./errors/AppError";

class App {
  private express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();

    this.postRegisterRoutes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }

  private postRegisterRoutes(): void {
    this.express.use(errors());

    this.express.use(
      (error: Error, request: Request, response: Response, _: NextFunction) => {
        if (error instanceof AppError) {
          return response
            .status(error.statusCode)
            .json({ status: "error", message: error.message });
        }

        return response
          .status(500)
          .json({ status: "error", message: "Internal Server Error" });
      }
    );
  }

  public get(): Express {
    return this.express;
  }
}

export default new App().get();
