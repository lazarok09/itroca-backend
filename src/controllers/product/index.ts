import { Request, Response } from 'express';
import { ProductModel } from '../../models/product';

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
      const requestBody: Product = req.body;

      const product = await new ProductModel().createProduct({
        image: requestBody.image,
        name: requestBody.name,
        price: Number(requestBody.price),
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
}
export default new ProductController();
