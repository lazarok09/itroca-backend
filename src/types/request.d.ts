import { Request } from 'express';

interface CustomUserRequest extends Request {
  user: VerifyJWTResultDecoded;
}
