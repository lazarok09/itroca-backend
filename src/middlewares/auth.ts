import { NextFunction, Request, Response } from 'express';
import { CustomUserRequest } from '../types/request';
import { verifyJWT } from '../lib/jsonwebtoken';
import { AuthModel } from '../models/auth';

import { extractAuthCookieFromRequest } from '../helpers/auth';
enum ENUM_AUTH_MIDDLEWARE {
  INVALID_TOKEN = 'Invalid token in authorization headers',
  MIDDLEWARE = 'Invalid or expired token in authorization headers',
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = extractAuthCookieFromRequest(req);
    if (!token || !token.length) {
      res.status(404).send(ENUM_AUTH_MIDDLEWARE.INVALID_TOKEN);
      return;
    }
    const isTokenInBlackList = await new AuthModel().verifyJWTInBlackList(
      token,
    );

    if (!isTokenInBlackList) {
      const decoded = await verifyJWT({ token });
      (req as CustomUserRequest).user = decoded;
      next();
    } else {
      res.status(401).send(ENUM_AUTH_MIDDLEWARE.INVALID_TOKEN);
    }
  } catch (e) {
    res.status(401).send(ENUM_AUTH_MIDDLEWARE.MIDDLEWARE);
  }
};
