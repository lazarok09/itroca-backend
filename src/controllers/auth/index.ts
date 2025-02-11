import { Request, Response } from 'express';
import { AuthModel } from '../../models/auth';
import {
  extractAuthCookieFromRequest,
  formatRefreshToken,
} from '../../helpers/auth';
import { AUTH_COOKIE_NAME } from '../../lib/jsonwebtoken';
import { GenericErrorHandler, PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';
import { ENUM_AUTH_CONTROLLER } from '../../types/dictionary';

class AuthController {
  // receive the request
  async signIn(req: Request, res: Response) {
    try {
      const email = req?.body?.email;
      const password = req?.body?.password;

      if (!email?.length || !password?.length) {
        res.status(422).send(
          new GenericErrorHandler({
            message: ENUM_AUTH_CONTROLLER.INVALID_REQUEST,
            status: 422,
          }),
        );
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
        res.status(401).send(
          new GenericErrorHandler({
            message: ENUM_AUTH_CONTROLLER.INVALID_CREDENTIALS,
            status: 401,
          }),
        );
      }
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;

      res.status(400).send(
        new PrismaErrorHandler({
          error: treatedError,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
          message: ENUM_AUTH_CONTROLLER.INVALID_CREDENTIALS,
        }),
      );
    }
  }
  async signOut(req: Request, res: Response) {
    try {
      const token = extractAuthCookieFromRequest(req);
      if (token) {
        const result = await new AuthModel().signOut(token);

        res.cookie(AUTH_COOKIE_NAME, null, {
          maxAge: 0,
          httpOnly: true,
        });

        res.status(200).send(result);
      } else {
        throw token;
      }
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;

      res.cookie(AUTH_COOKIE_NAME, null, {
        maxAge: 0,
        httpOnly: true,
      });

      res.status(400).send(
        new PrismaErrorHandler({
          message: ENUM_AUTH_CONTROLLER.LOGOFF_ERROR,
          status: 400,
          error: treatedError,
          prismaMessage: getPrismaMessage(treatedError),
        }),
      );
    }
  }
  async signUp(req: Request, res: Response) {
    try {
      const user: AuthUser & { password: string } = req.body;

      const isEmpty = (value: string) => value && !Boolean(value?.length);

      const emptyValues = [
        user.address,
        user.name,
        user.email,
        user.password,
        user.image,
      ].some(isEmpty);

      if (!Number.isSafeInteger(user.age) || emptyValues) {
        res.status(422).send(
          new GenericErrorHandler({
            message: ENUM_AUTH_CONTROLLER.SIGNUP_UNPROCESSABLE_ERROR,
            status: 422,
          }),
        );
        return;
      }
      await new AuthModel().signUp({
        address: user.address,
        name: user.name,
        email: user.email,
        age: user.age,
        password: user.password,
        image: user.image,
      });
      const signUpResponse = await new AuthModel().signIn(
        user.email,
        user.password,
      );
      res.status(201).send(signUpResponse);
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_AUTH_CONTROLLER.SIGNUP_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
}
export default new AuthController();
