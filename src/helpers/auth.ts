import { Request } from 'express';

export const extractBearerTokenFromAuthorization = (
  req: Request,
): string | undefined => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    return token;
  }
};
