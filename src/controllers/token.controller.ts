import { Request, Response } from "express";
import { TokenService } from "../services/token.service";
import { Card } from "../models/Card";
import { validateCVV, validateCardNumber } from "../utils/luhn";
import { BadRequestError } from "../libs/errors";
import { Logger } from "../libs/Logger";

export class TokenController {
  private tokenService: TokenService;
  private log: Logger;

  constructor() {
    this.tokenService = new TokenService();
    this.log = new Logger("controllers");
  }

  async createToken(req: Request, res: Response): Promise<void> {
    try {
      const { cardNumber, cvv, expirationMonth, expirationYear, email }: Card =
        req.body;
      this.isValidated(cardNumber, cvv, expirationMonth, expirationYear, email);
      const token = await this.tokenService.createToken(
        cardNumber,
        cvv,
        expirationMonth,
        expirationYear,
        email
      );
      this.log.debug("[creditCard]", JSON.stringify(token, null, 2));
      res.status(201).json({ token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  private isValidated(cardNumber, cvv, expirationMonth, expirationYear, email) {
    if (!cardNumber || !this.isValidCardNumber(cardNumber.toString())) {
      this.log.error("[creditCard]", JSON.stringify("Validate error", null, 2));
      throw new BadRequestError("400", "Is not valid Card Number");
    }
    if (!cvv || !this.isValidCVV(cvv)) {
      this.log.error("[creditCard]", JSON.stringify("Validate error", null, 2));
      throw new BadRequestError("400", "Is not valid CVV");
    }
    if (
      !expirationMonth ||
      !this.isValidExpirationMonth(parseInt(expirationMonth))
    ) {
      this.log.error("[creditCard]", JSON.stringify("Validate error", null, 2));
      throw new BadRequestError("400", "Is not valid Expiration Month");
    }
    if (
      !expirationYear ||
      !this.isValidExpirationYear(parseInt(expirationYear))
    ) {
      this.log.error("[creditCard]", JSON.stringify("Validate error", null, 2));
      throw new BadRequestError("400", "Is not valid Expiration Year");
    }
    if (!email || !this.isValidEmail(email.toString())) {
      this.log.error("[creditCard]", JSON.stringify("Validate error", null, 2));
      throw new BadRequestError("400", "Is not valid Email");
    }
  }
  private isValidCardNumber(cardNumber: string): boolean {
    return validateCardNumber(cardNumber);
  }
  private isValidCVV(cvv: number): boolean {
    return validateCVV(cvv);
  }
  private isValidExpirationMonth(expirationMonth: number): boolean {
    if (expirationMonth > 13) {
      return false;
    }
    return expirationMonth >= 1 && expirationMonth <= 12;
  }
  private isValidExpirationYear(expirationMonth: number): boolean {
    const monthLengh = expirationMonth.toString().replace(/\D/g, "");
    if (monthLengh.length === 0 || monthLengh.length < 4) {
      return false;
    }
    const currentTime = new Date();
    const value: number = currentTime.getFullYear() + 5;
    return value >= expirationMonth;
  }
  private isValidEmail(email: string): boolean {
    const re = /[\w.]@(yahoo.es|hotmail.com|gmail.com)(\W|$)/;
    return re.test(email);
  }
}
