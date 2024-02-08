import { Request } from 'express';
import { AUTH_COOKIE_NAME } from '../lib/jsonwebtoken';

// itrocacookie=apwkdopawkdpoawkdopawkodwa
export const extractAuthCookieFromRequest = (
  req: Request,
): string | undefined => {
  const token = req.cookies[AUTH_COOKIE_NAME];

  if (token) {
    return token;
  }
};

export const formatRefreshToken = ({ token }: { token: string }): number => {
  const refresh = process.env.REFRESH_TOKEN;
  const numbersInHour = Number(refresh?.split('h')[0]);

  const miliseconds = numbersInHour * 60 * 60 * 1000;

  return miliseconds;
};
