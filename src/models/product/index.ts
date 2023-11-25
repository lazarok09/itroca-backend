import { prismaClient } from '../../database/connect';

interface IProduct {
  getProduct: (id: number) => Promise<Product | undefined>;
  getProducts: () => Promise<Product[] | undefined>;
  createProduct: (product: Omit<Product, 'id'>) => Promise<Product | undefined>;
}
class ProductModel implements IProduct {
  async getProduct(id: number) {
    const product = await (
      await prismaClient()
    ).product.findFirst({
      where: {
        id,
      },
    });
    if (product) {
      return product;
    }
  }
  async createProduct(product: Omit<Product, 'id'>) {
    const createdProduct = await (
      await prismaClient()
    ).product.create({
      data: {
        image: product.image,
        name: product.name,
        price: product.price,
      },
    });
    if (createdProduct) {
      return createdProduct;
    }
  }
  async getProducts() {
    const searchedProducts = await (await prismaClient()).product.findMany();
    if (searchedProducts) {
      return searchedProducts;
    }
  }
}

export { ProductModel };
