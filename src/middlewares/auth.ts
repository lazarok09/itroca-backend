import { NextFunction, Request, Response } from 'express';
import { CustomUserRequest } from '../types/request';
import { verifyJWT } from '../lib/jsonwebtoken';
import { AuthModel } from '../models/auth';

import { extractAuthCookieFromRequest } from '../helpers/auth';
import { GenericErrorHandler } from '../handlers/error';
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
    const unauthorized = new GenericErrorHandler({
      message: ENUM_AUTH_MIDDLEWARE.INVALID_TOKEN,
      status: 401,
    });
    if (!token || !token.length) {
      res.status(401).send(unauthorized);
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
      res.status(401).send(unauthorized);
    }
  } catch (e) {
    res.status(400).send(
      new GenericErrorHandler({
        message: ENUM_AUTH_MIDDLEWARE.MIDDLEWARE,
        status: 400,
      }),
    );
  }
};
