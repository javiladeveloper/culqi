import express, { Request, Response } from "express";
import { CardController } from "../controllers/card.controller";
import { ValidateHeaders, ValidateExpirationToken } from "../libs/midleware";

const router = express.Router();
const cardController = new CardController();
router.get(
  "/card/:token",
  ValidateHeaders,
  ValidateExpirationToken,
  (req: Request, res: Response) => {
    return cardController.getCardData(req, res);
  }
);
export default router;
