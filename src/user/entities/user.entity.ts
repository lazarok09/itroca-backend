import { Product } from '../../products/entities/product.entity';

export class User {
  id: number;
  email: string;
  name: string;
  age: number;
  address: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}
