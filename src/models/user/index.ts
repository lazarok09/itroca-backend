import { generatePasswordHash } from '../../lib/bcrypt';
import { prismaClient } from '../../database/connect';

interface IUserModel {
  createUser: (props: SignUp) => Promise<User>;
  findUsers: () => Promise<User[] | undefined>;
  findUser: ({}: {
    id: number;
    user: VerifyJWTResultDecoded;
  }) => Promise<User | undefined>;
  deleteUsers: () => Promise<Number | undefined>;
}
interface SignUp extends Omit<User, 'id' | 'hash' | 'createdAt' | 'updatedAt'> {
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

    return {
      address: createdUser.address,
      age: createdUser.age,
      createdAt: createdUser.createdAt,
      email: createdUser.email,
      id: createdUser.id,
      name: createdUser.name,
      updatedAt: createdUser.updatedAt,
      hash: hash,
    };
  }
  async findUser({
    id,
    user,
  }: {
    id: number;
    user: VerifyJWTResultDecoded;
  }): Promise<User | undefined> {
    const searchedUser = await (
      await prismaClient()
    ).user.findFirst({
      where: {
        id,
      },
    });

    if (searchedUser) {
      if (user && user.data.email === searchedUser.email) {
        console.log(
          '🚀 ~ file: index.ts:60 ~ UserModel ~ user.data:',
          user.data,
        );
        return searchedUser;
      } else {
        throw new Error('Erro durante a validação do JWT do usuário');
      }
    } else {
      throw new Error('id de usuário não encontrado');
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
