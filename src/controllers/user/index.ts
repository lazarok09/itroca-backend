import { Request, Response } from 'express';
import { UserModel } from '../../models/user';
import { CustomUserRequest } from '../../types/request';
import { GenericErrorHandler, PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';
import { ENUM_USER_CONTROLLER } from '../../types/dictionary';

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
              message: ENUM_USER_CONTROLLER.USER_NOT_FOUND,
              status: 404,
            }),
          );
          return;
        }
        // buisiness logic to find user by jwt

        if (userJWT && userJWT.data.email === searchedUser.email) {
          res.status(200).send(searchedUser);
        } else {
          throw new Error(ENUM_USER_CONTROLLER.MIS_LEAD_TOKEN);
        }
      }
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_USER_CONTROLLER.SEARCH_USER_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
}
export default new UserController();
