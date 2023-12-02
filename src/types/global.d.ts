interface User {
  id: number;
  email: string;
  name: string;
  age: number;
  address: string;
  hash?: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

