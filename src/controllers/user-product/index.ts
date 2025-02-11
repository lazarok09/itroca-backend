import { Request, Response } from 'express';
import { ProductEntity, ProductModel } from '../../models/product';
import { CustomUserRequest } from '../../types/request';
import { GenericErrorHandler, PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';
import { ENUM_PRODUCT_CONTROLLER } from '../../types/dictionary';

class UserProductController {
  // receive the request

  async getProducts(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const userID = customRequest.user.data.id;

      const name = customRequest.query['name'] as string;
      const products = await new ProductModel().getProductsByUserID(
        userID,
        name,
      );
      res.status(200).send(products);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_PRODUCT_CONTROLLER.SEARCH_PRODUCTS_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
  async getProduct(req: Request, res: Response) {
    const productId = req.params['id'] as string | undefined;
    const customRequest: CustomUserRequest = req as any;
    const userID = customRequest.user.data.id;

    if (!productId?.length || !userID || isNaN(userID)) {
      res.status(422).send(
        new GenericErrorHandler({
          message: ENUM_PRODUCT_CONTROLLER.GENERIC_ERROR,
          status: 422,
        }),
      );
      return;
    }

    try {
      const product = await new ProductModel().getUserProductByID(
        Number(productId),
        userID,
      );

      res.status(200).send(product);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;

      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_PRODUCT_CONTROLLER.SEARCH_PRODUCT_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
  async updateProduct(req: Request, res: Response) {
    const productId = req.params['id'] as string | undefined;

    const customRequest: CustomUserRequest = req as any;

    const requestBody: ProductEntity = customRequest.body;

    if (
      !requestBody ||
      !productId?.length ||
      !requestBody?.image?.length ||
      !requestBody?.name?.length ||
      isNaN(requestBody?.price)
    ) {
      res.status(422).send(
        new GenericErrorHandler({
          message: ENUM_PRODUCT_CONTROLLER.GENERIC_ERROR,
          status: 422,
        }),
      );
      return;
    }

    try {
      const product = await new ProductModel().updateProduct({
        product: {
          image: requestBody.image,
          name: requestBody.name,
          price: Number(requestBody.price),
        },
        userID: customRequest.user.data.id,
        productId: parseInt(productId, 10),
      });

      res.status(200).send(product);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_PRODUCT_CONTROLLER.UPDATE_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;
      
      console.log(
        '🚀 ~ UserProductController ~ createProduct ~ customRequest:',
        customRequest,
      );

      const requestBody: ProductEntity = customRequest.body;

      if (
        !requestBody || (!requestBody?.price) ||
        isNaN(requestBody?.price) ||
        !requestBody?.image?.length ||
        !requestBody?.name?.length
      ) {
        res.status(422).send(
          new GenericErrorHandler({
            message:
              ENUM_PRODUCT_CONTROLLER.UNPROCESSABLE_PRODUCT_ENTITY_VALIDATION,
            status: 422,
          }),
        );
        return;
      }

      const product = await new ProductModel().createProduct({
        product: {
          image: requestBody.image,
          name: requestBody.name,
          price: Number(requestBody.price),
        },
        userID: customRequest.user.data.id,
      });

      res.status(201).send(product);
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;

      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message:
            ENUM_PRODUCT_CONTROLLER.UNPROCESSABLE_PRODUCT_ENTITY_CREATION,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
      return;
    }
  }
  async deleteProducts(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const userID = customRequest.user.data.id;

      const deletedProductsCount = await new ProductModel().deleteProducts(
        userID,
      );

      res.status(200).send(`Deleted ${deletedProductsCount} products`);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_PRODUCT_CONTROLLER.DELETE_ALL_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }
  async deleteProduct(req: Request, res: Response) {
    const productId = req.params?.id
      ? (Number(req.params['id']) as number | undefined)
      : undefined;

    const customRequest: CustomUserRequest = req as any;
    const userID = customRequest.user.data.id;

    if (!productId) {
      res.status(422).send(
        new GenericErrorHandler({
          message: ENUM_PRODUCT_CONTROLLER.GENERIC_ERROR,
          status: 422,
        }),
      );

      return;
    }

    try {
      const deletedProductsCount = await new ProductModel().deleteProduct(
        productId,
        userID,
      );
      res.status(200).send(`Deleted ${deletedProductsCount} product`);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;
      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: ENUM_PRODUCT_CONTROLLER.DELETE_ERROR,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
    res.sendStatus(400);
  }
}
export default new UserProductController();
