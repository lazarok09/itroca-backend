import { Request, Response } from 'express';
import { authenticateUser } from '../../services/auth';


export const authController = async (req: Request, res: Response) => {
  // receive the request
  if (req.method === 'POST') {
    try {
      const email = req?.body?.email;
      const password = req?.body?.password;
      // do business logic here
      await authenticateUser({
        email,
        password,
      });
      res.status(200);
      res.send('Sucesso');
    } catch (e) {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(405);
  }
};
