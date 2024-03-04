import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { CustomUserRequest } from '../../types/request';
import { GenericErrorHandler, PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';

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
          res.status(404).send(
            new GenericErrorHandler({
              message: 'Usuário não encontrado',
              status: 404,
            }),
          );
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
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: 'Erro durante a busca do usuário',
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
}
export default new UserController();
