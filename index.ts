import express, { Request, response, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const body = req.body;
  res.status(200).json({
    message: "welcome home bro",
  });
});
app.post("/user", (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json(body);
});
app.put("/user/:id", (req: Request, res: Response) => {
  const body = req.body;
  const params = req.params;
  const queries = req.query;
  //   res.status(200).json({ body, id, queries });
  res.status(200).json({ ...body, ...params, ...queries });
});

app.listen(4001, () => console.log("app listening to port 4001"));
