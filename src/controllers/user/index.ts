import { Request, Response } from 'express';

import { prismaClient } from '../../database/connect';

export const userController = async (req: Request, res: Response) => {
  // receive the request
  if (req.method === 'POST') {
    const numeroAleatorio = Math.random() * 1000 * Math.random();
    try {
      const user = await (
        await prismaClient()
      ).user.create({
        data: {
          address: `${numeroAleatorio} endereço`,
          age: 12 + numeroAleatorio,
          email: `Email${numeroAleatorio}@gmail.com`,
          name: `George${numeroAleatorio}`,
        },
      });
      res.status(200).send(user);
    } catch (e) {
      res.sendStatus(400);
    }
  }
  if (req.method === 'GET') {
    try {
      const userID = req.params['id'] as string | null;
      if (userID?.length) {
        const user = await (
          await prismaClient()
        ).user.findUnique({
          where: {
            id: Number(userID),
          },
        });

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
