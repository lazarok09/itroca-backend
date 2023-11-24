import { Request, Response } from 'express';
import { generateRandomNumber } from '../../utils/generic';

import { UserModel } from '../../models/user';

class userController {
  // receive the request
  async createUser(req: Request, res: Response) {
    const numeroAleatorio = generateRandomNumber();
    try {
      const user = await new UserModel().createUser({
        address: `Avenida Paulista nº${numeroAleatorio}`,
        age: numeroAleatorio,
        email: `testuser${numeroAleatorio}@hotmail.com`,
        name: `testuser${numeroAleatorio}`,
      });

      res.status(200).send(user);
    } catch (e) {
      res
        .status(400)
        .send('Ocorreu um erro durante a criação de um novo usuário');
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const userID = req.params['id'] as string | null;

      if (userID?.length) {
        const user = await new UserModel().findUser(Number(userID));
        if (!user) {
          res.sendStatus(404);
        }
        res.status(200).send(user);
      } else {
        res.status(400);
        res.send('Parametro obrigatório não especificado');
      }
    } catch (e) {
      res.status(400).send(`Ocorreu um erro durante a busca do usuário`);
    }
  }
}
export default new userController();
