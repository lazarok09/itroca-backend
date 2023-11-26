import { authenticateUser } from '../../services/auth';
interface IAuthModel {
  authorize: (email: string, password: string) => Promise<User>;
}

class AuthModel implements IAuthModel {
  async authorize(email: string, password: string) {
    const result = await authenticateUser({ email, password });
    return result;
  }
}
export { AuthModel };
