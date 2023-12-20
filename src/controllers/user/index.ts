import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { CustomUserRequest } from '../../types/request';

class UserController {
  // receive the request

  async getUser(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;
      const userJWT = customRequest?.user;

      if (userJWT.data.email) {
        const searchedUser = await new UserModel().findUser({
          email: userJWT?.data?.email,
        });

        if (!searchedUser) {
          res.status(404).send('Usuário não encontrado');
          return;
        }
        // buisiness logic to find user by jwt

        if (userJWT && userJWT.data.email === searchedUser.email) {
          res.status(200).send(searchedUser);
        } else {
          throw new Error('Token JWT incorreto');
        }
      }
    } catch (e) {
      res.status(400).send('Erro durante a busca do usuário');
    }
  }
}
export default new UserController();
