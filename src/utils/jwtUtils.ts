import { Card } from "../models/Card";
import jwt from "jsonwebtoken";

const secretKey = "your-secret-key";

const signToken = (card: Card): string => {
  return jwt.sign(card, secretKey, { expiresIn: "1m" });
};

const verifyToken = (token: string): Card => {
  return jwt.verify(token, secretKey) as Card;
};

export default { signToken, verifyToken };
