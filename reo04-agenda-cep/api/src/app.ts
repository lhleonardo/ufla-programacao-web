import express, { Express } from "express";
import cors from "cors";
import routes from "./routes";

class App {
  private express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(routes);
  }

  public get(): Express {
    return this.express;
  }
}

export default new App().get();
