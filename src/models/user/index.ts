import { generatePasswordHash } from '../../lib/bcrypt';
import { prismaClient } from '../../database/connect';

interface IUserModel {
  createUser: (props: SignUp) => Promise<User>;
  findUser: ({ email }: { email: string }) => Promise<User | undefined>;
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
  async findUser({ email }: { email: string }): Promise<User | undefined> {
    const searchedUser = await (
      await prismaClient()
    ).user.findFirst({
      where: {
        email: email,
      },
    });

    if (searchedUser) {
      return searchedUser;
    }
  }
}

export { UserModel };
