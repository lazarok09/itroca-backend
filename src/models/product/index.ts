import { prismaClient } from '../../database/connect';
export interface ProductEntity extends Omit<Product, 'id'> {}
interface UserProduct {
  product: ProductEntity;
  userID: number;
}
interface UpdateProduct extends UserProduct {
  productId: Product['id'];
}

interface IProduct {
  getProduct: (id: number, userID: number) => Promise<Product | undefined>;
  getProducts: (userID: number) => Promise<Product[] | undefined>;
  updateProduct: (props: UpdateProduct) => Promise<Product | undefined>;
  createProduct: (props: UserProduct) => Promise<Product | undefined>;
  deleteProducts: (userID: number) => Promise<number | undefined>;
  deleteProduct: (id: number, userID: number) => Promise<Product | undefined>;
}
class ProductModel implements IProduct {
  async getProduct(id: number, userID: number) {
    const product = await (
      await prismaClient()
    ).product.findFirst({
      where: {
        id,
        userID: userID,
      },
    });
    if (product) {
      return product;
    }
  }
  async getProducts(userID: number, queryName?: string) {
    const name = Boolean(queryName?.length) ? `${queryName}` : undefined;

    const searchedProducts = await (
      await prismaClient()
    ).product.findMany({
      where: {
        userID: userID,
        name: {
          search: name,
        },
      },
    });

    if (searchedProducts) {
      return searchedProducts;
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
}

export { ProductModel };
