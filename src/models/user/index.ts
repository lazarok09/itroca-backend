import { generatePasswordHash } from '../../lib/bcrypt';
import { prismaClient } from '../../database/connect';
import { VerifyJWTResultDecoded } from '../../lib/jsonwebtoken';

interface IUserModel {
  createUser: (props: SignUp) => Promise<User>;
  findUsers: () => Promise<User[] | undefined>;
  findUser: ({}: {
    id: number;
    user: VerifyJWTResultDecoded;
  }) => Promise<User | undefined>;
  deleteUsers: () => Promise<Number | undefined>;
}
interface SignUp extends Omit<User, 'id' | 'hash'> {
  password: string;
}
class UserModel implements IUserModel {
  async createUser(user: SignUp): Promise<User> {
    const hash = await generatePasswordHash({ password: user.password });

    const createdUser = await (
      await prismaClient()
    ).user.create({
      data: {
        address: user.address,
        age: user.age,
        email: user.email,
        name: user.name,
        hash: hash,
      },
    });

    return createdUser;
  }
  async findUser({
    id,
    user,
  }: {
    id: number;
    user: VerifyJWTResultDecoded;
  }): Promise<User | undefined> {
    console.log('🚀 ~ file: index.ts:42 ~ UserModel ~ user:', user);
    const searchedUser = await (
      await prismaClient()
    ).user.findFirst({
      where: {
        id,
      },
    });

    if (searchedUser) {
      if (user && user.data.email === searchedUser.email) {
        return searchedUser;
      } else {
        throw new Error('Erro durante a validação do usuário');
      }
    } else {
      throw new Error('Erro durante a busca do usuário');
    }
  }
  async findUsers(): Promise<User[] | undefined> {
    const searchedUsers = await (await prismaClient()).user.findMany();
    if (searchedUsers) {
      return searchedUsers;
    }
  }
  async deleteUsers(): Promise<Number | undefined> {
    const deletedUsers = await (await prismaClient()).user.deleteMany();
    if (deletedUsers.count) {
      return deletedUsers.count;
    }
  }
}

export { UserModel };
