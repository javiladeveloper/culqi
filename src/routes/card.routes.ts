import express from "express";
import { CardController } from "../controllers/card.controller";

const router = express.Router();
const cardController = new CardController();
router.get("/card/:token", (req, res) => {
  return cardController.getCardData(req, res);
});
export default router;
