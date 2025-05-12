import express from "express";

import MyRouter from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MyRouter.run(app);

export const PORT = 4001;
export default app;
