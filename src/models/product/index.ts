import { prismaClient } from '../../database/connect';
interface CreateProduct {
  product: Pick<Product, 'image' | 'name' | 'price'>;
  userID: number;
}
interface IProduct {
  getProduct: (id: number) => Promise<Product | undefined>;
  getProducts: () => Promise<Product[] | undefined>;
  createProduct: (props: CreateProduct) => Promise<Product | undefined>;
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
  async createProduct({ product, userID }: CreateProduct) {
    const createdProduct = await (
      await prismaClient()
    ).product.create({
      data: {
        image: product.image,
        name: product.name,
        price: product.price,
        userID: userID,
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
