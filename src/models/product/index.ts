import { prismaClient } from '../../database/connect';
interface UserProduct {
  product: Omit<Product, 'id'>;
  userID: number;
}
interface UpdateProduct extends UserProduct {
  productId: Product['id'];
}

interface IProduct {
  getProduct: (id: number) => Promise<Product | undefined>;
  getProducts: () => Promise<Product[] | undefined>;
  updateProduct: (props: UpdateProduct) => Promise<Product | undefined>;
  createProduct: (props: UserProduct) => Promise<Product | undefined>;
  deleteProducts: () => Promise<number | undefined>;
  deleteProduct: (id: number) => Promise<Product | undefined>;
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
  async updateProduct({ product, userID, productId }: UpdateProduct) {
    const updatedProduct = await (
      await prismaClient()
    ).product.update({
      where: {
        id: productId,
      },
      data: {
        image: product.image,
        name: product.name,
        price: product.price,
        userID: userID,
      },
    });
    if (updatedProduct) {
      return updatedProduct;
    }
  }
  async createProduct({ product, userID }: UserProduct) {
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
  async deleteProducts() {
    const result = await (await prismaClient()).product.deleteMany();
    if (result) {
      return result.count;
    }
  }
  async deleteProduct(id: number) {
    const deletedProduct = await (
      await prismaClient()
    ).product.delete({
      where: {
        id,
      },
    });
    if (deletedProduct) {
      return deletedProduct;
    }
  }
}

export { ProductModel };
