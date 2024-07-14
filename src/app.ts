import express, { Request, Response } from "express";
import cors from "cors";
import { routes } from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app = express();

// parsers
app.use(express.json());
app.use(cors());

// test route
const test = (req: Request, res: Response) => {
  res.send("Hello World, welcome to fitness zone server!");
};
app.get("/", test);

// application route
app.use("/api", routes);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
