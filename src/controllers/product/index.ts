import { Request, Response } from 'express';

export const productController = async (req: Request, res: Response) => {
  // receive the request
  if (req.method === 'GET') {
    try {
      res.status(200);
      res.send('Sucesso');
    } catch (e) {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(405);
  }
};
