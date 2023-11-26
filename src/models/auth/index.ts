import { UserModel } from '../../models/user';
import { authenticateUser, signOffUser } from '../../services/auth';
interface IAuthModel {
  signIn: (email: string, password: string) => Promise<User>;
  signOut: (id: number) => Promise<Boolean>;
  signUp: ({ address, age, email }: Omit<User, 'id'>) => Promise<User>;
}

class AuthModel implements IAuthModel {
  async signIn(email: string, password: string) {
    const result = await authenticateUser({ email, password });
    // authenticate this user in the server
    // return the token
    return result;
  }

  async signOut(id: number) {
    const result = await signOffUser({ id });
    // send to blacklist this user token
    return result;
  }
  async signUp({ address, age, email, name }: Omit<User, 'id'>) {
    // create user
    const result = await new UserModel().createUser({
      email,
      address,
      age,
      name,
    });
    // authenticate this user in the server
    // return the user and the token
    return result;
  }
}
export { AuthModel };
