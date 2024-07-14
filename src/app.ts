import express, { Request, Response } from "express";
import { routes } from "./app/routes";

const app = express();

// parsers
app.use(express.json());

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World, ");
});

export default app;
