import { Request, Response } from 'express';
import { ProductModel } from '../../models/product';
import { CustomUserRequest } from '../../types/request';

class ProductController {
  // receive the request

  async getProducts(req: Request, res: Response) {
    try {
      const products = await new ProductModel().getProducts();
      res.status(200).send(products);
      return products;
    } catch (e) {
      res
        .status(400)
        .send(`Parece que ocorreu um erro durante a busca de produtos ${e}`);
    }
  }
  async getProduct(req: Request, res: Response) {
    const productId = req.params['id'] as string | undefined;
    if (Boolean(productId?.length)) {
      try {
        const product = await new ProductModel().getProduct(Number(productId));
        res.status(200).send(product);
        return product;
      } catch (e) {
        res.status(400).send(`Parece que um erro ocorreu ${e}`);
      }
    }
    res.sendStatus(400);
  }
  async createProduct(req: Request, res: Response) {
    try {
      const customRequest: CustomUserRequest = req as any;

      const requestBody: Product = customRequest.body;

      const product = await new ProductModel().createProduct({
        product: {
          image: requestBody.image,
          name: requestBody.name,
          price: Number(requestBody.price),
        },
        userID: customRequest.user.data.id,
      });

      res.status(200).send(product);
      return product;
    } catch (e) {
      res
        .status(400)
        .send(`Parece que ocorreu um erro durante a criação do produto: ${e}`);
    }
    res.sendStatus(400);
  }
  async deleteProducts(req: Request, res: Response) {
    try {
      const deletedProductsCount = await new ProductModel().deleteProducts();

      res.status(200).send(`Deleted ${deletedProductsCount} products`);
    } catch (e) {
      res.status(400).send(`Ocorreu um erro ao apagar os produtos: ${e}`);
    }
    res.sendStatus(400);
  }
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = Number(req.params['id']) as number | undefined;
      if (!productId) {
        res.status(404).send('Product id is missing');
        return;
      }
      const deletedProductsCount = await new ProductModel().deleteProduct(
        productId,
      );
      res.status(200).send(`Deleted ${deletedProductsCount} product`);
    } catch (e) {
      res.status(400).send(`Ocorreu um erro ao apagar o produto: ${e}`);
    }
    res.sendStatus(400);
  }
}
export default new ProductController();
