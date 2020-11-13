import express, { Express } from "express";
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
  }

  private routes(): void {
    this.express.use(routes);
  }

  public get(): Express {
    return this.express;
  }
}

export default new App().get();
