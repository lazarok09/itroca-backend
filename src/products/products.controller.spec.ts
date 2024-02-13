import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { DataBaseModule } from '../infra/database/prisma/database.module';
import { Product } from './entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DataBaseModule],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create a product', async () => {
    expect(
      await controller.create({
        image: 'http://github.com/lazarok09.png',
        name: 'Produto Teste',
        price: 500,
      }),
    ).toBeInstanceOf(Product);
  });
});
