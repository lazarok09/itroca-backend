import { Request, Response } from 'express';
import { ProductModel } from '../../models/product';
import { CustomUserRequest } from '../../types/request';
import { PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';
import { EnumProductControllerErrors } from '../user-product';

class ProductsController {
  // receive the request

  async getProducts(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const name = customRequest.query['name'] as string;
      const products = await new ProductModel().getProducts(name);

      res.status(200).send(products);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: EnumProductControllerErrors.search,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
}

export default new ProductsController();
