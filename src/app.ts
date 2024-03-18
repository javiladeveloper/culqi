import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cardRoutes from "./routes/card.routes";
import tokenRoutes from "./routes/token.routes";
const app: Application = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api", cardRoutes);
app.use("/api", tokenRoutes);
app.get("/healthcheck", (_req, res) => {
  res.send({ status: "Working" });
});
// Error handling middleware
app.use(function (err: Error, _req: Request, res: Response) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
