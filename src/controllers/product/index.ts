import { Request, Response } from 'express';
import { ProductEntity, ProductModel } from '../../models/product';
import { CustomUserRequest } from '../../types/request';
import { GenericErrorHandler, PrismaErrorHandler } from '../../handlers/error';
import { PrismaErrorShape, getPrismaMessage } from '../../handlers/prismaerror';
enum EnumProductControllerErrors {
  generic = 'Ocorreu um erro ao validar as informações do produto.',
  attr = 'Verifique os atributos e tente novamente.',
  search = 'Parece que ocorreu um erro durante a busca de produtos.',
  update = 'Parece que ocorreu um erro durante a atualização deste produto.',
  deleteAll = 'Ocorreu um erro ao apagar os produtos.',
  delete = 'Ocorreu um erro ao apagar este produto.',
}
class ProductController {
  // receive the request

  async getProducts(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const userID = customRequest.user.data.id;
      const products = await new ProductModel().getProducts(userID);
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
  async getProduct(req: Request, res: Response) {
    const productId = req.params['id'] as string | undefined;
    const customRequest: CustomUserRequest = req as any;
    const userID = customRequest.user.data.id;

    if (!productId?.length || !userID || isNaN(userID)) {
      res.status(422).send(
        new GenericErrorHandler({
          message: EnumProductControllerErrors.generic,
          status: 422,
        }),
      );
      return;
    }

    try {
      const product = await new ProductModel().getProduct(
        Number(productId),
        userID,
      );

      res.status(200).send(product);
    } catch (e) {
      const treatedError = e as PrismaErrorShape;

      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: 'Ocorreu um erro na busca do produto',
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
          message: EnumProductControllerErrors.generic,
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
          message: EnumProductControllerErrors.update,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const requestBody: ProductEntity = customRequest.body;
      if (
        !requestBody ||
        isNaN(requestBody?.price) ||
        !requestBody?.image?.length ||
        !requestBody?.name?.length
      ) {
        res.status(422).send(
          new GenericErrorHandler({
            message: 'Ocorreu um erro ao validar as informações do produto',
            status: 422,
          }),
        );
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
      return product;
    } catch (e) {
      const treatedError: PrismaErrorShape = e as any;

      res.status(400).send(
        new PrismaErrorHandler({
          error: e,
          message: 'Parece que ocorreu um erro durante a criação do produto',
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
          message: EnumProductControllerErrors.deleteAll,
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
          message: EnumProductControllerErrors.generic,
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
          message: EnumProductControllerErrors.delete,
          prismaMessage: getPrismaMessage(treatedError),
          status: 400,
        }),
      );
    }
    res.sendStatus(400);
  }
}
export default new ProductController();
