import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DataBaseModule } from 'src/infra/database/prisma/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
