import {
  IsInt,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsOptional()
  createdAt: string;

  @IsOptional()
  @IsString()
  updatedAt: string;
}
