import { Request } from 'express';

interface CustomUserRequest extends Request {
  user: VerifyJWTResultDecoded;
}
interface AuthUser extends Omit<User, 'hash'> {}
interface VerifyJWTResultDecoded {
  data: { email: string; id: number };
}