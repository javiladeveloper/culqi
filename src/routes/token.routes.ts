import express from "express";
import { TokenController } from "../controllers/token.controller";

const router = express.Router();
const tokenController = new TokenController();

router.post("/token", (req, res) => {
  return tokenController.createToken(req, res);
});
router.get("/token/verify", (req, res) => {
  return tokenController.verifyToken(req, res);
});

export default router;
