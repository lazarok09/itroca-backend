import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { CustomUserRequest } from '../../types/request';

class UserController {
  // receive the request

  async getUser(req: Request, res: Response) {
    try {
      const userID = req.params['id'] as string | null;
      const customRequest: CustomUserRequest = req as any;

      if (userID?.length) {
        const user = await new UserModel().findUser({
          id: Number(userID),
          user: customRequest?.user,
        });

        if (!user) {
          res.status(404).send('Usuário não encontrado');
        }

        res.status(200).send(user);
      } else {
        res.status(400);
        res.send('Parametro obrigatório não especificado');
      }
    } catch (e) {
      res.status(400).send(`Ocorreu um erro durante a busca do usuário: ${e}`);
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await new UserModel().findUsers();
      if (!users) {
        res.sendStatus(404);
      }
      res.status(200).send(users);
    } catch (e) {
      res.status(400).send(`Ocorreu um erro durante a busca de usuários`);
    }
  }
  async deleteUsers(req: Request, res: Response) {
    try {
      const users = await new UserModel().deleteUsers();
      if (!users) {
        res.status(400).send(`Ocorreu um erro ao apagar todos os usuários`);
      }
      res.status(200).send(`Você deletou com sucesso ${users}`);
    } catch (e) {
      res.status(400).send(`Ocorreu um erro ao apagar todos os usuários`);
    }
  }
}
export default new UserController();
