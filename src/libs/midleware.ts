import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../libs/errors";
import jwt from "../utils/jwtUtils";
import config from "../config/vars";

export function ValidateHeaders(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization?.replace("Bearer ", "");
  if (!authorization) {
    throw new UnauthorizedError("CREDIT_CARD", "No Autorizated");
  }

  if (authorization !== config.autorization) {
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
