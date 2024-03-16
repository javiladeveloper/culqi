import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../libs/errors";
import jwt from "../utils/jwtUtils";
import config from "../config/vars";

export function ValidateHeaders(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    throw new UnauthorizedError("CREDIT_CARD", "No Autorizated");
  }

  const TokenArray = (<string>req.headers.authorization).split(" ");
  if (TokenArray[1] !== config.autorization) {
    throw new UnauthorizedError("CREDIT_CARD", "Token No Format");
  }
  next();
}

export function ValidateExpirationToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  jwt.verifyToken(req.params.token);
  next();
}
