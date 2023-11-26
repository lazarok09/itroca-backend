import { prismaClient } from '../../database/connect';

interface IUserModel {
  createUser: (user: Omit<User, 'id'>) => Promise<User>;
  findUsers: () => Promise<User[] | undefined>;
  findUser: (id: number) => Promise<User | undefined>;
  deleteUsers: () => Promise<Number | undefined>;
}

class UserModel implements IUserModel {
  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const createdUser = await (
      await prismaClient()
    ).user.create({
      data: {
        address: user.address,
        age: user.age,
        email: user.email,
        name: user.name,
      },
    });

    return createdUser;
  }
  async findUser(id: number): Promise<User | undefined> {
    const searchedUser = await (
      await prismaClient()
    ).user.findFirst({
      where: {
        id,
      },
    });
    if (searchedUser) {
      return searchedUser;
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
