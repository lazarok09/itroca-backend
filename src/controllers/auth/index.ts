import { Request, Response } from 'express';
import { AuthModel } from '../../models/auth';

class AuthController {
  // receive the request
  async login(req: Request, res: Response) {
    try {
      const email = req?.body?.email;
      console.log("🚀 ~ file: index.ts:9 ~ AuthController ~ login ~ email:", email)
      const password = req?.body?.password;
      console.log("🚀 ~ file: index.ts:11 ~ AuthController ~ login ~ password:", password)
      // do business logic here
      const result = await new AuthModel().authorize(email, password);
      res.status(200);
      res.send(`Sucesso: ${result}`);
    } catch (e) {
      res.status(400).send('Ocorreu um erro durante o login do usuário');
    }
  }
}
export default new AuthController();
