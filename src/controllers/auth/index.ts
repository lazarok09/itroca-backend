import { Request, Response } from 'express';
import { AuthModel } from '../../models/auth';

class AuthController {
  // receive the request
  async signIn(req: Request, res: Response) {
    try {
      const email = req?.body?.email;
      const password = req?.body?.password;

      if (!email?.length || !password?.length) {
        res.status(400).send('Atributo email ou senha não especificados');
      }
      // do business logic here
      const result = await new AuthModel().signIn(email, password);
      if (result) {
        res.status(200);
        res.send(result);
      } else {
        res.status(401).send(`Usuário ou senha incorretos`);
      }
    } catch (e) {
      res.status(400).send('Ocorreu um erro durante o login do usuário');
    }
  }
  async signOff(req: Request, res: Response) {
    try {
      const userId = req.body?.id;
      const result = await new AuthModel().signOut(userId);
      res.status(200).send(`Sucesso no log off: ${result}`);
    } catch (e) {
      res.status(400).send('Ocorreu um erro durante o logoff do usuário');
    }
  }
  async signUp(req: Request, res: Response) {
    try {
      const user: User & { password: string } = req.body;

      if (
        !user.address?.length ||
        !user.name?.length ||
        !user.email?.length ||
        !user.age ||
        !user.password?.length
      ) {
        res
          .status(400)
          .send(
            'Ocorreu um erro durante o registro. Verifique os atributos novamente',
          );
      }
      const result = await new AuthModel().signUp({
        address: user.address,
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
      });

      res.status(200).send(result);
    } catch (e) {
      res
        .status(400)
        .send('Ocorreu um erro durante o cadastro de um novo usuário');
    }
  }
}
export default new AuthController();
