import { Request, Response } from 'express';
import { AuthModel } from '../../models/auth';
import {
  extractAuthCookieFromRequest,
  formatRefreshToken,
} from '../../helpers/auth';
import { AUTH_COOKIE_NAME } from '../../lib/jsonwebtoken';
import { ErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';

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
        res.cookie(AUTH_COOKIE_NAME, result.token, {
          maxAge: formatRefreshToken({ token: result.token }),
          httpOnly: true,
        });
        res.send(result);
      } else {
        res.status(401).send(`Usuário ou senha incorretos`);
      }
    } catch (e) {
      console.error('🚀 ~ file: index.ts:33 ~ AuthController ~ signIn ~ e:', e);
      res.status(400).send('Ocorreu um erro durante o login do usuário');
    }
  }
  async signOff(req: Request, res: Response) {
    try {
      const token = extractAuthCookieFromRequest(req);
      if (token) {
        const result = await new AuthModel().signOut(token);
        res.status(200).send(result);
      } else {
        throw token;
      }
    } catch (e) {
      res.status(400).send('Ocorreu um erro durante o logoff do usuário');
    }
  }
  async signUp(req: Request, res: Response) {
    try {
      const user: AuthUser & { password: string } = req.body;
      console.log('🚀 ~ AuthController ~ signUp ~ user:', user);

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
        return;
      }
      await new AuthModel().signUp({
        address: user.address,
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
      });
      const signUpResponse = await new AuthModel().signIn(
        user.email,
        user.password,
      );
      res.status(200).send(signUpResponse);
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;
      res.status(400).send(
        new ErrorHandler({
          error: e,
          message: 'Ocorreu um erro durante o cadastro de um novo usuário',
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
}
export default new AuthController();
