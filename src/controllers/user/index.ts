import { Request, Response } from 'express';
import { generateRandomNumber } from '../../utils/generic';

import { UserModel } from '../../models/user';

export const userController = async (req: Request, res: Response) => {
  // receive the request
  if (req.method === 'POST') {
    const numeroAleatorio = generateRandomNumber();
    try {
      const user = new UserModel().createUser({
        address: `Avenida Paulista nº${numeroAleatorio}`,
        age: numeroAleatorio,
        email: `testuser${numeroAleatorio}@hotmail.com`,
        name: `testuser${numeroAleatorio}`,
      });
      res.status(200).send(user);
    } catch (e) {
      res.sendStatus(400);
    }
  }
  if (req.method === 'GET') {
    try {
      const userID = Number(req.params['id'] as string | null);
      if (userID) {
        const user = new UserModel().findUser(userID);

        res.status(200).send(user);
      } else {
        res.status(400).send('Parametro obrigatório não especificado');
      }
    } catch (e) {
      res.status(400).send(`Ocorreu um erro durante a busca do usuário`);
    }
  }
  res.sendStatus(404);
};
