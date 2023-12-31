import { Request } from 'express';

export const extractBearerTokenFromAuthorization = (
  req: Request,
): string | undefined => {
  const token = req.headers['authorization']?.split(' ')[1];
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
