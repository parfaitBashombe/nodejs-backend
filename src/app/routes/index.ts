import { Application, Request, Response } from "express";

import blogRoutes from "./blogs";
import { responseHandler } from "../helpers/response-handler";
import userRoutes from "./users";

const apiVersion = "/api";

class MyRouter {
  static run(app: Application) {
    app.use(apiVersion, blogRoutes, userRoutes);

    app.get(apiVersion, (req: Request, res: Response) => {
      responseHandler(res, 200, "Welcome to my blog");
    });
  }
}

export default MyRouter;
