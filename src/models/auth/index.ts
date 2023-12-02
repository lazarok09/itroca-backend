import { prismaClient } from '../../database/connect';
import { UserModel } from '../../models/user';
import { comparePasswordHash } from '../../lib/bcrypt';
import { generateJWT } from '../../lib/jsonwebtoken';
interface SignUpModelProps
  extends Omit<User, 'id' | 'password' | 'hash' | 'createdAt' | 'updatedAt'> {
  password: string;
}
interface IAuthModel {
  signIn: (email: string, password: string) => Promise<User | undefined>;
  signOut: (token: string) => Promise<TokenBlackList | undefined>;
  signUp: (props: SignUpModelProps) => Promise<Omit<User, 'hash'>>;
  verifyJWTInBlackList: (token: string) => Promise<Boolean>;
  createJWTInBlackList: (token: string) => Promise<TokenBlackList | undefined>;
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
        const token = generateJWT({ email, id: searchedUser.id });
        const user: User = {
          address: searchedUser.address,
          age: searchedUser.age,
          createdAt: searchedUser.createdAt,
          email: searchedUser.email,
          id: searchedUser.id,
          name: searchedUser.name,
          updatedAt: searchedUser.updatedAt,
        };

        return { ...user, token: token };
      }
    }
    // authenticate this user in the server
    // return the token
  }

  async signOut(token: string) {
    const result = await new AuthModel().createJWTInBlackList(token);
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
  async verifyJWTInBlackList(token: string): Promise<boolean> {
    const tokenInBlackList = await (
      await prismaClient()
    ).tokenBlackList.findFirst({
      where: {
        token: token,
      },
    });
    if (tokenInBlackList) {
      return true;
    } else {
      return false;
    }
  }
  async createJWTInBlackList(
    token: string,
  ): Promise<TokenBlackList | undefined> {
    const createdJWT = await (
      await prismaClient()
    ).tokenBlackList.create({
      data: {
        token,
      },
    });
    if (createdJWT) {
      return createdJWT;
    }
  }
}
export { AuthModel };
