import { Request, Response } from "express";
import { CardService } from "../services/card.service";
export class CardController {
  private cardService: CardService;

  constructor() {
    this.cardService = new CardService();
  }

  async getCardData(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const cardData = await this.cardService.getCardData(token);
      res.status(200).json(cardData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
