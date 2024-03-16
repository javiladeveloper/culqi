import express, { Request, Response } from "express";
import { TokenController } from "../controllers/token.controller";
import { ValidateHeaders } from "../libs/midleware";
const router = express.Router();
const tokenController = new TokenController();

router.post("/token", ValidateHeaders, (req: Request, res: Response) => {
  return tokenController.createToken(req, res);
});

export default router;
