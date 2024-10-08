interface AuthUser extends Omit<User, 'hash'> {}
interface VerifyJWTResultDecoded {
  data: { email: string; id: number };
}

interface TokenBlackList {
  id: number;
  token: string;
  createdAt: Date;
  updatedAt: Date;
}
