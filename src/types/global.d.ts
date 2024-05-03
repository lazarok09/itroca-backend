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

interface PostImageToCloudnary {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<String>;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
}
