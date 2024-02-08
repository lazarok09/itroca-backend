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
  getProducts: (userID: number) => Promise<Product[] | undefined>;
  updateProduct: (props: UpdateProduct) => Promise<Product | undefined>;
  createProduct: (props: UserProduct) => Promise<Product | undefined>;
  deleteProducts: (userID: number) => Promise<number | undefined>;
  deleteProduct: (id: number, userID: number) => Promise<Product | undefined>;
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
  async getProducts(userID: number) {
    const searchedProducts = await (
      await prismaClient()
    ).product.findMany({
      where: {
        userID: userID,
      },
    });
    if (searchedProducts) {
      return searchedProducts;
    }
  }
  async deleteProducts(userID: number) {
    const result = await (
      await prismaClient()
    ).product.deleteMany({
      where: {
        userID: userID,
      },
    });
    if (result) {
      return result.count;
    }
  }
  async deleteProduct(id: number, userID: number) {
    const deletedProduct = await (
      await prismaClient()
    ).product.delete({
      where: {
        id,
        userID: userID,
      },
    });
    if (deletedProduct) {
      return deletedProduct;
    }
  }
}

export { ProductModel };
