import { Request, Response } from "express";
import { TokenService } from "../services/token.service";
import { Card } from "models/Card";

export class TokenController {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async createToken(req: Request, res: Response): Promise<void> {
    try {
      const {
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email,
      }: Card = req.body;
      const token = await this.tokenService.createToken(
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email
      );
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.headers;
      await this.tokenService.verifyToken(token as string);
      res.status(200).send("Token verified successfully");
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
}
