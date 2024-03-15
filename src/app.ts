import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cardRoutes from "./routes/card.routes";
import tokenRoutes from "./routes/token.routes";

const app: Application = express();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", cardRoutes);
app.use("/api", tokenRoutes);

// Error handling middleware
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export default app;
