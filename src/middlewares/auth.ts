import { NextFunction, Request, Response } from 'express';
import { CustomUserRequest } from '../types/request';
import { verifyJWT } from '../lib/jsonwebtoken';
enum ENUM_AUTH_MIDDLEWARE {
  INVALID_TOKEN = 'Bad request: invalid token in authorization headers',
  MIDDLEWARE = 'Invalid or expired token in authorization headers',
}
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1];
  try {
    if (!token || !token.length) {
      res.status(404).send(ENUM_AUTH_MIDDLEWARE.INVALID_TOKEN);
      return;
    }
    const decoded = await verifyJWT({ token });
    (req as CustomUserRequest).user = decoded;
    next();
  } catch (e) {
    res.status(401).send(ENUM_AUTH_MIDDLEWARE.MIDDLEWARE);
  }
};
