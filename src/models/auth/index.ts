import { prismaClient } from '../../database/connect';
import { UserModel } from '../../models/user';
import { signOffUser } from '../../services/auth';
import { comparePasswordHash } from '../../lib/bcrypt';
interface SignUpModelProps extends Omit<User, 'id' | 'password' | 'hash'> {
  password: string;
}
interface IAuthModel {
  signIn: (email: string, password: string) => Promise<User | undefined>;
  signOut: (id: number) => Promise<Boolean>;
  signUp: (props: SignUpModelProps) => Promise<Omit<User, 'hash'>>;
}

class AuthModel implements IAuthModel {
  async signIn(email: string, password: string) {
    const searchedUser = await (
      await prismaClient()
    ).user.findUnique({
      where: {
        email: email,
      },
    });

    if (searchedUser) {
      const isUserHashValid = await comparePasswordHash({
        password: password,
        hash: searchedUser.hash,
      });

      if (isUserHashValid) {
        // create a JWT generator
        return searchedUser;
      }
    }
    // authenticate this user in the server
    // return the token
  }

  async signOut(id: number) {
    const result = await signOffUser({ id });
    // send to blacklist this user token
    return result;
  }
  async signUp({ address, age, email, name, password }: SignUpModelProps) {
    // create user
    const result = await new UserModel().createUser({
      email,
      address,
      age,
      name,
      password,
    });
    // authenticate this user in the server
    // return the user and the token

    return result;
  }
}
export { AuthModel };
