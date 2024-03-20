import { Request, Response } from "express";
import { CardService } from "../services/card.service";
import { Logger } from "../libs/Logger";

export class CardController {
  private cardService: CardService;
  private log: Logger;

  constructor() {
    this.cardService = new CardService();
    this.log = new Logger("controllers");
  }

  async getCardData(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const cardData = await this.cardService.getCardData(token);
      this.log.debug("[creditCard]", JSON.stringify(cardData, null, 2));
      res.status(200).json(cardData);
    } catch (error: any) {
      this.log.error("[creditCard]", JSON.stringify(error.message, null, 2));
      res.status(500).json({ error: error.message });
    }
  }
}
