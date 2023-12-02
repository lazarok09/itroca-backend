interface AuthUser extends Omit<User, 'hash'> {}
interface VerifyJWTResultDecoded {
  data: { email: string; id: number };
}
